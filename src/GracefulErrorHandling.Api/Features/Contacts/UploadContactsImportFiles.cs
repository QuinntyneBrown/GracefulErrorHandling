using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;
using GracefulErrorHandling.Api.Data;
using GracefulErrorHandling.Api.Models;
using GracefulErrorHandling.Api.Helpers;
using GracefulErrorHandling.Api.Core;

namespace GracefulErrorHandling.Api.Features
{
    public class UploadContactsImportFiles
    {
        public class Request : IRequest<Response> { }

        public class Response: ResponseBase
        {
            public List<Guid> ContactsImportFileIds { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IGracefulErrorHandlingDbContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(IGracefulErrorHandlingDbContext context, IHttpContextAccessor httpContextAccessor) {            
                _context = context;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {

                var httpContext = _httpContextAccessor.HttpContext;
                var defaultFormOptions = new FormOptions();
                var contactsImportFiles = new List<ContactsImportFile>();

                if (!MultipartRequestHelper.IsMultipartContentType(httpContext.Request.ContentType))
                    throw new Exception($"Expected a multipart request, but got {httpContext.Request.ContentType}");

                var mediaTypeHeaderValue = MediaTypeHeaderValue.Parse(httpContext.Request.ContentType);

                var boundary = MultipartRequestHelper.GetBoundary(
                    mediaTypeHeaderValue,
                    defaultFormOptions.MultipartBoundaryLengthLimit);

                var reader = new MultipartReader(boundary, httpContext.Request.Body);

                var section = await reader.ReadNextSectionAsync();

                while (section != null)
                {

                    var contactsImportFile = new ContactsImportFile();

                    var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out ContentDispositionHeaderValue contentDisposition);

                    if (hasContentDispositionHeader)
                    {
                        if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                        {
                            using (var targetStream = new MemoryStream())
                            {
                                await section.Body.CopyToAsync(targetStream);
                                contactsImportFile.Name = $"{contentDisposition.FileName}".Trim(new char[] { '"' }).Replace("&", "and");
                                contactsImportFile.Bytes = StreamHelper.ReadToEnd(targetStream);
                                contactsImportFile.ContentType = section.ContentType;
                            }
                        }
                    }

                    _context.ContactsImportFiles.Add(contactsImportFile);

                    contactsImportFiles.Add(contactsImportFile);

                    section = await reader.ReadNextSectionAsync();
                }

                await _context.SaveChangesAsync(cancellationToken);

                return new ()
                {
                    ContactsImportFileIds = contactsImportFiles.Select(x => x.ContactsImportFileId).ToList()
                };
            }
        }
    }
}
