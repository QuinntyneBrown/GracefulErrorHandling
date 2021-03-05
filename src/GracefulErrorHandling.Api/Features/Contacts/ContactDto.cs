using System;

namespace GracefulErrorHandling.Api.Features
{
    public class ContactDto
    {
        public Guid ContactId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}
