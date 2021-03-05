using System.Collections.Generic;

namespace GracefulErrorHandling.Api.Core
{
    public class ResponseBase
    {
        public List<string> ValidationErrors { get; } 
            = new List<string>();
    }
}
