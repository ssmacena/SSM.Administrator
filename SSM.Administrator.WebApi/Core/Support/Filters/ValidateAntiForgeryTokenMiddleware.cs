using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

namespace SSM.Administrator.WebApi.Core.Filters
{
    public class ValidateAntiForgeryTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IAntiforgery _antiforgery;

        public ValidateAntiForgeryTokenMiddleware(RequestDelegate next, IAntiforgery antiforgery)
        {
            _next = next;
            _antiforgery = antiforgery;
        }

        public async Task Invoke(HttpContext context)
        {
            //if (context.Request.Path == "/")
            //{
            //    var tokens = _antiforgery.GetAndStoreTokens(context);
            //    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions
            //    {                    
            //        Path = "/",
            //        Secure = true,
            //        HttpOnly = false,
            //        IsEssential = true, //<- there
            //        Expires = DateTime.Now.AddMonths(1),
            //    });
            //}
            if (HttpMethods.IsGet(context.Request.Method))
            {
                _antiforgery.GetAndStoreTokens(context);
            }

            if (HttpMethods.IsPost(context.Request.Method))
            {
                try
                {
                    await _antiforgery.ValidateRequestAsync(context);
                }
                catch (AntiforgeryValidationException exception)
                {
                    //_logger.AntiforgeryTokenInvalid(exception.Message, exception);
                    context.Response.StatusCode = 400;
                }
            }

            await _next(context);
        }
    }
}
