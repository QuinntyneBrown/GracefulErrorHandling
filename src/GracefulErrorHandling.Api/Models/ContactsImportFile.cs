using System;

namespace GracefulErrorHandling.Api.Models
{
    public class ContactsImportFile
    {
        public Guid ContactsImportFileId { get; set; }
        public string Name { get; set; }
        public byte[] Bytes { get; set; }
        public string ContentType { get; set; }
    }
}
