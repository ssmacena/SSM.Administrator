using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace SSM.Administrator.WebApi.Core.Context
{
    public class ApplicationUser : IdentityUser
    {
        public List<IdentityUserRole<string>> Roles { get; set; }
    }
}
