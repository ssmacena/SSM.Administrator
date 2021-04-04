using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SSM.Administrator.Entity;
using SSM.Administrator.Entity.Enumeration;
using SSM.Administrator.WebApi.Core.Base;
using SSM.Administrator.WebApi.Core.Services;
using SSM.Administrator.WebApi.Core.Support.Filters;
using System;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("secure/customer")]
    public class CustomerController : WebApiControllerBase
    {
        private CustomerService service;

        //https://stackoverflow.com/questions/41058142/injecting-dbcontext-into-service-layer

        public CustomerController(IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            this.service = new CustomerService(httpContextAccessor.HttpContext, mapper);
        }

        //private readonly ILogger<CustomerController> _logger;

        //public CustomerController(ILogger<CustomerController> logger)
        //{
        //    _logger = logger;
        //    this.service = new CustomerService();
        //}

        // GET api/customer/{guid}
        [Route("getById")]
        [HttpGet]
        public IActionResult Get(int customerId)
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

        [HttpGet]
        [HasPermission(Permission.AccessAll)]
        public IActionResult Get()
        {
            IActionResult response = BadRequest();

            try
            {
                var result = this.service.GetAll();
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

        //POST: customer/save-entity
        [Route("save-entity")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        //[HasPermission(Permission.AccessAll)]
        public async Task<IActionResult> Save([FromBody] Clientes model)
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
        public IActionResult GetByFilter(string nmCliente)
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
        public IActionResult DeleteById(int id)
        {
            IActionResult response = BadRequest();

            try
            {
                var result = this.service.DeleteByIdCustomer(id);
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
