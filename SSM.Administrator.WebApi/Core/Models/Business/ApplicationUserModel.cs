using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Models.Business
{
    public class ApplicationUserModel
    {
        public string Id { get; set; }

        public string PasswordHash { get; set; }

        public bool EmailConfirmed { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public string ConcurrencyStamp { get; set; }

        public string Phone { get; set; }
    }
}
