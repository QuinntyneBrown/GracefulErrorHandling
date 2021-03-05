using MediatR;
using System;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;

namespace GracefulErrorHandling.Api.Behaviors
{
    public class ErrorBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            Random random = new ();

            if(random.Next(0,10) > 5)
                throw new Exception();

            return await next();
        }
    }
}