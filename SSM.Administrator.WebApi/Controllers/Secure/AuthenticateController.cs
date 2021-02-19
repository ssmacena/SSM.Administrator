﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SSM.Administrator.WebApi.Core.Base;
using SSM.Administrator.WebApi.Core.Context;
using SSM.Administrator.WebApi.Core.Models;
using SSM.Administrator.WebApi.Core.Models.Business;
using SSM.Administrator.WebApi.Core.Services;
using System;
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

        public AuthenticateController(SignInManager<ApplicationUser> signInManager,
                                      UserManager<ApplicationUser> userManager,
                                      IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        //private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

        //public AuthenticateController(IDbContextFactory<ApplicationDbContext> contextFactory)
        //{
        //    _contextFactory = contextFactory;           
        //}

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            //return this.Execute<UserProfile<Permission>>(delegate
            //{
            //    var businessController = CreateBusiness<AuthenticationManager>();
            //    UserProfile<Permission> result = businessController.RetrieveProfileByCredentials(model.Username, model.Password);
            //    //businessController.Dispose();
            //    return result;
            //});

            var user = await _userManager.FindByEmailAsync(model.Username);

            //await _userManager.AddToRoleAsync(user, "Admin");

            //await _userManager.AddToRoleAsync(user, "Operator");

            //await _userManager.AddToRoleAsync(user, "User");


            if (user != null)
            {                
                var passwordIsCorrect = await _userManager.CheckPasswordAsync(user, model.Password);
                if (passwordIsCorrect)
                {
                    var userRoles = await _userManager.GetRolesAsync(user);

                    return Ok(new
                    {
                        //token = new JwtSecurityTokenHandler().WriteToken(token),
                        token = TokenService.createToken(user.UserName, userRoles, _configuration),
                        expiresIn = DateTime.UtcNow.AddDays(1)
                    });
                }
                    //var authClaims = new List<Claim>
                    //{
                    //    new Claim(ClaimTypes.Name, user.UserName),
                    //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //};

                    //foreach (var userRole in userRoles)
                    //{
                    //    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    //}

                    //var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    //var token = new JwtSecurityToken(
                    //    issuer: _configuration["JWT:ValidIssuer"],
                    //    audience: _configuration["JWT:ValidAudience"],
                    //    expires: DateTime.Now.AddHours(3),
                    //    claims: authClaims,
                    //    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    //    );


            }
            return Unauthorized();
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

    }
}
