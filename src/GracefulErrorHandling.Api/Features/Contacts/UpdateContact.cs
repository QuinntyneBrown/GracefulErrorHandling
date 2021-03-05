using FluentValidation;
using GracefulErrorHandling.Api.Core;
using GracefulErrorHandling.Api.Data;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace GracefulErrorHandling.Api.Features
{
    public class UpdateContact
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.Contact).NotNull();
                RuleFor(request => request.Contact).SetValidator(new ContactValidator());
            }
        }

        public class Request : IRequest<Response> {  
            public ContactDto Contact { get; set; }
        }

        public class Response: ResponseBase
        {
            public ContactDto Contact { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IGracefulErrorHandlingDbContext _context;

            public Handler(IGracefulErrorHandlingDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {

                var contact = (await _context.Contacts.FindAsync(request.Contact.ContactId))
                    .Update(request.Contact.Firstname, request.Contact.Lastname);

                await _context.SaveChangesAsync(cancellationToken);

                return new () { Contact = contact.ToDto() };
            }
        }
    }
}
