using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Filters
{
    public class ValidateAntiforgeryTokenAuthorizationFilter : IAsyncAuthorizationFilter, IAntiforgeryPolicy
    {
        private readonly IAntiforgery _antiforgery;
        //https://csharp.hotexamples.com/pt/site/file?hash=0x307bc20f63e4c75e19f362a3a3026ec438bedf882f519fa8852855071708935b&fullName=src/Microsoft.AspNetCore.Mvc.ViewFeatures/ValidateAntiforgeryTokenAuthorizationFilter.cs&project=ymd1223/Mvc
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }
            if (IsClosestAntiforgeryPolicy(context.Filters) && ShouldValidate(context))
            {
                try
                {
                    //context.HttpContext.Request.Headers.TryGetValue()
                    await _antiforgery.ValidateRequestAsync(context.HttpContext);
                }
                catch (AntiforgeryValidationException exception)
                {
                    //_logger.AntiforgeryTokenInvalid(exception.Message, exception);
                    context.Result = new BadRequestResult();
                }
            }
        }

        protected virtual bool ShouldValidate(AuthorizationFilterContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            return true;
        }

        private bool IsClosestAntiforgeryPolicy(IList<IFilterMetadata> filters)
        {
            // Determine if this instance is the 'effective' antiforgery policy.
            for (var i = filters.Count - 1; i >= 0; i--)
            {
                var filter = filters[i];
                if (filter is IAntiforgeryPolicy)
                {
                    return object.ReferenceEquals(this, filter);
                }
            }

            //Debug.Fail("The current instance should be in the list of filters.");
            return false;
        }
    }
}
