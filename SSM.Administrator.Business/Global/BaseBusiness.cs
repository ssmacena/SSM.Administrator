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
        protected String CurrentUserId { get; set; }
        protected List<String> CurrentUserPermissions { get; private set; }
        protected DataContextSet _dbContext;

        public void SetCurrentUser(String currentUserId)
        {
            this.CurrentUserId = currentUserId;
        }

        public void SetCurrentUserInformation(ICollection<String> permissions)
        {
            this.CurrentUserPermissions = new List<String>();

            if (permissions != null)
                this.CurrentUserPermissions.AddRange(permissions);
        }
    }
}
