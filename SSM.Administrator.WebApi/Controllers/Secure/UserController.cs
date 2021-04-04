using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SSM.Administrator.WebApi.Core.Base;
using SSM.Administrator.WebApi.Core.Context;
using SSM.Administrator.WebApi.Core.Models;
using SSM.Administrator.WebApi.Core.Models.Business;
using SSM.Administrator.WebApi.Core.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Controllers.Secure
{
    [Route("secure/user")]
    [ApiController]
    public class UserController : WebApiControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public UserController(SignInManager<ApplicationUser> signInManager,
                              UserManager<ApplicationUser> userManager,
                              IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            IActionResult response = BadRequest();

            try
            {
                var result = _userManager.Users.ToList();

                response = Ok(result);
            }
            catch (Exception ex)
            {
                response = BadRequest(ex.Message);
            }

            return response;
        }


        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] ApplicationUserModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.UserName);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser newUser = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName
            };
            var creationResult = await _userManager.CreateAsync(newUser, model.PasswordHash);
            if (!creationResult.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser([FromRoute] string userName)
        {
            var user = await _userManager.FindByEmailAsync(userName);
            if (user == null)
                return NoContent();

            await _userManager.DeleteAsync(user);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] ApplicationUserModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return NoContent();

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.EmailConfirmed = model.EmailConfirmed;
            user.PasswordHash = model.PasswordHash;
            user.PhoneNumber = model.Phone;

            await _userManager.UpdateAsync(user);
            return Ok();
        }
    }
}
