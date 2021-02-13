using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SSM.Administrator.Entity
{
    public partial class AspNetUsers
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public Boolean EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string PhoneNumber { get; set; }
        public Boolean PhoneNumberConfirmed { get; set; }
        public Boolean TwoFactorEnabled { get; set; }
        public DateTime? LockoutEnd { get; set; }
        public Boolean LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }

        #region Generated Relationships
        public virtual ICollection<AspNetUserRoles> UserAspNetUserRoles { get; set; }
        #endregion
    }
}
