using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
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
    public class AuthenticateController : WebApiControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IAntiforgery _antiForgery;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _principalFactory;

        public AuthenticateController(SignInManager<ApplicationUser> signInManager,
                                      UserManager<ApplicationUser> userManager,
                                      IUserClaimsPrincipalFactory<ApplicationUser> principalFactory,
                                      IAntiforgery antiForgery,
                                      IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _antiForgery = antiForgery;
            _principalFactory = principalFactory;
        }

        [Route("login")]
        [HttpPost]
        [IgnoreAntiforgeryToken]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Username);
            if (user == null)
                return Unauthorized();

            //await _userManager.AddToRoleAsync(user, "Admin");

            //await _userManager.AddToRoleAsync(user, "Operator");

            //await _userManager.AddToRoleAsync(user, "User");


            var signInResult = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, isPersistent: true, lockoutOnFailure: false);
            if (!signInResult.Succeeded)
                return Unauthorized();

            var userRoles = await _userManager.GetRolesAsync(user);

            var tokens = _antiForgery.GetAndStoreTokens(HttpContext);
            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false });

            var principal = await _principalFactory.CreateAsync(user);
            this.HttpContext.User = principal;

            return Ok(new
            {
                //token = new JwtSecurityTokenHandler().WriteToken(token),
                token = TokenService.createToken(user.UserName, userRoles, _configuration),
                expiresIn = DateTime.UtcNow.AddDays(1)
            });
        }

        [HttpGet]
        [Route("check-session")]
        public async Task<IActionResult> CheckValidSession()
        {
            IActionResult response = Ok();
            return response;
        }

    }
}
