using FluentValidation;

namespace GracefulErrorHandling.Api.Features
{
    public class ContactValidator : AbstractValidator<ContactDto>
    {
        public ContactValidator()
        {
            RuleFor(x => x.Firstname).NotEmpty().NotNull();
            RuleFor(x => x.Lastname).NotEmpty().NotNull();
        }
    }
}
