using GracefulErrorHandling.Api.Behaviors;
using GracefulErrorHandling.Api.Data;
using GracefulErrorHandling.Api.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;

namespace GracefulErrorHandling.Api
{
    public static class Dependencies
    {
        public static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Graceful Error Handling",
                    Description = "Handling various errors and exceptions gracefully",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Quinntyne Brown",
                        Email = "quinntynebrown@gmail.com"
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under MIT",
                        Url = new Uri("https://opensource.org/licenses/MIT"),
                    }
                });

                options.CustomSchemaIds(x => x.FullName);
            });


            services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(isOriginAllowed: _ => true)
                .AllowCredentials()));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ErrorBehavior<,>));

            services.AddValidation(typeof(Startup));

            services.AddHttpContextAccessor();

            services.AddMediatR(typeof(Startup));

            services.AddTransient<IGracefulErrorHandlingDbContext, GracefulErrorHandlingDbContext>();

            services.AddDbContext<GracefulErrorHandlingDbContext>(options =>
            {
                options.UseInMemoryDatabase(configuration["Data:DefaultConnection:ConnectionString"])
                .UseLoggerFactory(GracefulErrorHandlingDbContext.ConsoleLoggerFactory)
                .EnableSensitiveDataLogging();
            });

            services.AddControllers();
        }
    }
}
