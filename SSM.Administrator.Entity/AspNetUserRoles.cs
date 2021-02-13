using System;
using System.Collections.Generic;
using System.Text;

namespace SSM.Administrator.Entity
{
    public class AspNetUserRoles
    {
        #region Generated Properties
        public string UserId { get; set; }
        public string RoleId { get; set; }
        #endregion

        #region Generated Relationships
        public virtual AspNetRoles RoleAspNetRoles { get; set; }

        public virtual AspNetUsers UserAspNetUsers { get; set; }
        #endregion
    }
}
