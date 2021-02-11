using Microsoft.AspNetCore.Mvc;
using SSM.Administrator.WebApi.Support;
using System;
using Microsoft.AspNetCore.Antiforgery;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Controllers
{
    [Route("Secure/antiforgery")]
    [ApiController]
    public class AntiForgeryController : WebApiControllerBase
    {
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
