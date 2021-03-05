using GracefulErrorHandling.Api.Models;

namespace GracefulErrorHandling.Api.Features
{
    public static class ContactExtensions
    {
        public static ContactDto ToDto(this Contact contact)
        {
            return new ContactDto
            {
                ContactId = contact.ContactId,
                Firstname = contact.Firstname,
                Lastname = contact.Lastname
            };
        }
    }
}
