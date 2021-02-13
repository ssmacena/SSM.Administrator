using SSM.Administrator.WebApi.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Services
{
    public class CustomerService : WebApiControllerBase
    {
        public CustomerService() : base() { }

        public static CustomerService GetInstance()
        {
            return new CustomerService();
        }
    }
}
