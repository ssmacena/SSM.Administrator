using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Services
{
    public static class TokenService
    {
        public static string createToken(string username, IList<string> userRoles, IConfiguration configuration)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //Set the time when it expires
            DateTime expires = DateTime.UtcNow.AddDays(1);

            var tokenHandler = new JwtSecurityTokenHandler();

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            });

            foreach (var userRole in userRoles)
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, userRole));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var signingCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature);

            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: configuration["JWT:ValidIssuer"], audience: configuration["JWT:ValidAudience"],
                                                        subject: claimsIdentity, notBefore: issuedAt, expires: expires,
                                                        signingCredentials: signingCredentials);

            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
