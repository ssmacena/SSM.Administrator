using Microsoft.AspNetCore.Mvc;
using SSM.Administrator.WebApi.Authentication;
using SSM.Administrator.WebApi.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Controllers
{
    [Route("api/Customer")]
    [Produces("application/json")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService service;

        public CustomerController()
        {
            this.service = CustomerService.GetInstance();
        }

        //POST: secure/account-document/list
        [Route("list")]
        [HttpPost]
        public async Task<IActionResult> List([FromBody] RegisterModel model)
        {
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
    }
}
