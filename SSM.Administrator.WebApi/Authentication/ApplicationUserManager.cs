using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Authentication
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {

        private readonly IConfiguration _configuration;

        public ApplicationUserManager(IUserStore<ApplicationUser> store, IOptions<IdentityOptions> optionsAccessor,
                           IPasswordHasher<ApplicationUser> passwordHasher, IEnumerable<IUserValidator<ApplicationUser>> userValidators,
                           IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators, ILookupNormalizer keyNormalizer,
                           IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<ApplicationUser>> logger, IConfiguration configuration)
                           : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
            _configuration = configuration;
        }

        public class PasswordValidator : IPasswordValidator<ApplicationUser>
        {
            public Task<IdentityResult> ValidateAsync(UserManager<ApplicationUser> manager, ApplicationUser user, string password)
            {
                return Task.Run(() =>
                {
                    if (password.Length >= 4) return IdentityResult.Success;
                    else { return IdentityResult.Failed(new IdentityError { Code = "SHORTPASSWORD", Description = "Password too short" }); }
                });
            }
        }

        public class CustomOptions : IOptions<IdentityOptions>
        {
            public IdentityOptions Value { get; private set; }
            public CustomOptions()
            {
                Value = new IdentityOptions
                {
                    ClaimsIdentity = new ClaimsIdentityOptions(),
                    //Cookies = new IdentityCookieOptions(),
                    Lockout = new LockoutOptions(),
                    Password = null,
                    User = new UserOptions(),
                    SignIn = new SignInOptions(),
                    Tokens = new TokenOptions()
                };
            }
        }
    }
}
