using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using SSM.Administrator.WebApi.Core.Base;
using System;

namespace SSM.Administrator.WebApi.Controllers.Secure
{
    [Route("secure/antiforgery")]
    [ApiController]
    public class AntiForgeryController : WebApiControllerBase
    {
        private readonly IAntiforgery _antiForgery;
        public AntiForgeryController(IAntiforgery antiForgery)
        {
            _antiForgery = antiForgery;
        }

        //https://www.blinkingcaret.com/2018/11/29/asp-net-core-web-api-antiforgery/
        [Route("generate")]
        [IgnoreAntiforgeryToken]
        [HttpGet]
        public IActionResult GenerateAntiForgeryTokens()
        {
            IActionResult response = BadRequest();

            try
            {
                var tokens = _antiForgery.GetAndStoreTokens(HttpContext);
                Response.Cookies.Append("XSRF-REQUEST-TOKEN", tokens.RequestToken, new CookieOptions
                {
                    HttpOnly = false
                });
                return NoContent();
            }
            catch (Exception ex)
            {
                response = BadRequest(ex.Message);
            }

            return response;
        }
    }
}
