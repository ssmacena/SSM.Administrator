using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SSM.Administrator.Business;
using SSM.Administrator.Entity;
using SSM.Administrator.WebApi.Authentication;
using SSM.Administrator.WebApi.Core.Services;
using SSM.Administrator.WebApi.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : WebApiControllerBase
    {
        private CustomerService service;

        //https://stackoverflow.com/questions/41058142/injecting-dbcontext-into-service-layer

        public CustomerController(IHttpContextAccessor httpContextAccessor)
        {
            this.service = new CustomerService(httpContextAccessor.HttpContext);
        }

        //private readonly ILogger<CustomerController> _logger;

        //public CustomerController(ILogger<CustomerController> logger)
        //{
        //    _logger = logger;
        //    this.service = new CustomerService();
        //}

        #region missing404docs
        // GET api/customer/{guid}
        [HttpGet("{id}", Name = "GetById")]
        [ProducesResponseType(typeof(Clientes), StatusCodes.Status200OK)]
        public IActionResult Get([FromBody] int customerId)
        {
            IActionResult response = BadRequest();

            try
            {
                var result = this.service.GetByIdCustomer(customerId);
                if (result != null)
                    response = Ok(result);
            }
            catch (Exception ex)
            {
                response = BadRequest(ex.Message);
            }

            return response;
            //return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
        #endregion

        //POST: customer/save-entity
        [Route("save-entity")]
        [HttpPost]
        public IActionResult Save([FromBody] Clientes model)
        {
            IActionResult response = BadRequest();

            try
            {
                var result = this.service.SaveCustomer(model);
                response = Ok(result);
            }
            catch (Exception ex)
            {
                response = BadRequest(ex.Message);
            }

            return response;
            //return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        //POST: customer/save-entity
        [Route("getByFilter")]
        [HttpGet]
        public IActionResult GetByFilter([FromBody] string nmCliente)
        {
            IActionResult response = BadRequest();

            try
            {
                var result = this.service.GetByFilterCustomer(nmCliente);
                response = Ok(result);
            }
            catch (Exception ex)
            {
                response = BadRequest(ex.Message);
            }

            return response;
            //return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        // DELETE api/contacts/{guid}
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int customerId)
        {
            IActionResult response = BadRequest();

            try
            {
                var result = this.service.DeleteByIdCustomer(customerId);
                response = Ok(result);
            }
            catch (Exception ex)
            {
                response = BadRequest(ex.Message);
            }

            return response;
            //return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
    }
}
