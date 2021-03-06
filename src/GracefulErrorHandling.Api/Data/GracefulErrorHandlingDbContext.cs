using GracefulErrorHandling.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GracefulErrorHandling.Api.Data
{
    public class GracefulErrorHandlingDbContext: DbContext, IGracefulErrorHandlingDbContext
    {
        public GracefulErrorHandlingDbContext(DbContextOptions options)
            :base(options) { }
        public DbSet<Contact> Contacts { get; private set; }
    }
}
