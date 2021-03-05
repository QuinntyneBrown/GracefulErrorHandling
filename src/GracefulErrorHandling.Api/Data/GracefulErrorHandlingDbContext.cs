using GracefulErrorHandling.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GracefulErrorHandling.Api.Data
{
    public class GracefulErrorHandlingDbContext: DbContext, IGracefulErrorHandlingDbContext
    {
        public GracefulErrorHandlingDbContext(DbContextOptions options)
            :base(options) { }

        public static readonly ILoggerFactory ConsoleLoggerFactory
            = LoggerFactory.Create(builder => { builder.AddConsole(); });

        public DbSet<Contact> Contacts { get; private set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
