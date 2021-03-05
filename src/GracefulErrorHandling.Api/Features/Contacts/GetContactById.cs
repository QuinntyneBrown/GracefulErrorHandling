using GracefulErrorHandling.Api.Data;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace GracefulErrorHandling.Api.Features
{
    public class GetContactById
    {
        public class Request : IRequest<Response> {  
            public Guid ContactId { get; set; }        
        }

        public class Response
        {
            public ContactDto Contact { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IGracefulErrorHandlingDbContext _context;

            public Handler(IGracefulErrorHandlingDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {

                var contact = await _context.Contacts.FindAsync(request.ContactId);

                return new Response() { 
                    Contact = contact?.ToDto()
                };
            }
        }
    }
}
