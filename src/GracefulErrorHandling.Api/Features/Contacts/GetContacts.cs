using GracefulErrorHandling.Api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace GracefulErrorHandling.Api.Features
{
    public class GetContacts
    {
        public class Request : IRequest<Response> {
            public int PageIndex { get; set; }
            public int PageSize { get; set; }
        }

        public class Response
        {
            public int Length { get; set; }
            public List<ContactDto> Entities { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IGracefulErrorHandlingDbContext _context;

            public Handler(IGracefulErrorHandlingDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {
                var query = from contact in _context.Contacts
                            select contact;

                var length = await query.CountAsync(cancellationToken);

                var entities = await query.Skip(request.PageSize * request.PageIndex).Take(request.PageSize)
                    .Select(x => x.ToDto())
                    .ToListAsync(cancellationToken);

                return new () { 
                    Length = length,
                    Entities = entities
                };
            }
        }
    }
}
