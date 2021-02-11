using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SSM.Administrator.Data;
using SSM.Administrator.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SSM.Administrator.Business.Global
{
    public class BaseBusiness
    {
        protected List<Permission> CurrentUserPermissions { get; private set; }
        protected String CurrentUserId { get; set; }
        public Boolean ProxyCreationEnabled { get; set; }
        protected DataContextSet _dbContext;
        //public BaseBusiness(DataContextSet dbContext)
        //{
        //    _dbContext = dbContext;
        //}

        public void SetCurrentUser(String currentUserId)
        {
            this.CurrentUserId = currentUserId;
        }

        public void SetCurrentUserInformation(ICollection<Permission> permissions)
        {
            this.CurrentUserPermissions = new List<Permission>();

            if (permissions != null)
                this.CurrentUserPermissions.AddRange(permissions);
        }
    }
}
