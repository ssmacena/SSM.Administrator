using Microsoft.AspNetCore.Mvc;
using SSM.Administrator.WebApi.Core.Base;
using System;

namespace SSM.Administrator.WebApi.Controllers.Secure
{
    [Route("secure/antiforgery")]
    [ApiController]
    public class AntiForgeryController : WebApiControllerBase
    {
        [Route("generate")]
        [HttpGet]
        public IActionResult Generate()
        {
            IActionResult response = BadRequest();

            try
            {
                string cookieToken;
                string formToken;

                response = Ok();
            }
            catch (Exception ex)
            {
                response = BadRequest(ex.Message);
            }

            return response;
        }
    }
}
