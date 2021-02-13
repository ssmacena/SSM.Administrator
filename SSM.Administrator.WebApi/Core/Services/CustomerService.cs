using SSM.Administrator.Business;
using SSM.Administrator.Entity;
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

        public SJSS_Customer GetByIdCustomer(int idCustomer)
        {
            SJSS_Customer customer = null;

            var businessController = CreateBusiness<CustomerBS>();
            customer = businessController.GetByIdCustomer(idCustomer);

            return customer;
        }

        public bool SaveCustomer(SJSS_Customer customer)
        {
            bool result = false;

            var businessController = CreateBusiness<CustomerBS>();
            result = businessController.SaveCustomer(customer);

            return result;
        }

        public List<SJSS_Customer> GetByFilterCustomer(string nmCliente)
        {
            var businessController = CreateBusiness<CustomerBS>();
            List<SJSS_Customer> customer = businessController.GetByFilterCustomer(nmCliente);

            return customer;
        }

        public bool DeleteByIdCustomer(int idCustomer)
        {
            var businessController = CreateBusiness<CustomerBS>();
            return businessController.DeleteByIdCustomer(idCustomer);
        }
    }
}
