using System;

namespace GracefulErrorHandling.Api.Models
{
    public class Contact
    {
        public Guid ContactId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public Contact()
        {

        }

        public Contact(string firstname, string lastname)
        {
            Firstname = firstname;
            Lastname = lastname;
        }

        public Contact Update(string firstname, string lastname)
        {
            Firstname = firstname;
            Lastname = lastname;
            return this;
        }
    }
}
