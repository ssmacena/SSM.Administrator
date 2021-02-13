using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SSM.Administrator.Entity;
using SSM.Administrator.WebApi.Authentication;
using SSM.Administrator.WebApi.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Controllers
{
    [Route("api/customer")]
    [Produces("application/json")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService service;

        public CustomerController()
        {
            this.service = CustomerService.GetInstance();
        }

        #region missing404docs
        // GET api/customer/{guid}
        [HttpGet("{id}", Name = "GetById")]
        [ProducesResponseType(typeof(SJSS_Customer), StatusCodes.Status200OK)]
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
        public IActionResult Save([FromBody] SJSS_Customer model)
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
        [HttpPost]
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
