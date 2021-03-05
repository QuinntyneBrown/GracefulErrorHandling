using GracefulErrorHandling.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace GracefulErrorHandling.Api.Data
{
    public interface IGracefulErrorHandlingDbContext
    {
        DbSet<Contact> Contacts { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
