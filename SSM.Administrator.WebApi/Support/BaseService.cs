using SSM.Administrator.Business.Global;
using SSM.Administrator.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Support
{
    public class BaseService
    {
        protected ClaimsPrincipal claimsPrincipal { get; set; }
        //protected T CreateBusiness<T>()
        //    where T : BaseBusiness, new()
        //{
        //T business = (T)Activator.CreateInstance(typeof(T), _dbContext);
        //return business;
        //}

        public void SetCurrentHttpContext(ClaimsPrincipal principal)
        {
            this.claimsPrincipal = principal;
        }
    }
}
