using SSM.Administrator.Business;
using SSM.Administrator.Data;
using SSM.Administrator.Entity;
using SSM.Administrator.WebApi.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Services
{
    public class CustomerService : BaseService, ICustomerService
    {
        protected readonly DataContextSet _dbContext;
        public CustomerService(DataContextSet dbContext)
        {
            _dbContext = dbContext;
        }

        public Clientes GetByIdCustomer(int idCustomer)
        {
            Clientes customer = null;

            var businessController = new CustomerBS(_dbContext);
            customer = businessController.GetByIdCustomer(idCustomer);

            return customer;
        }

        public bool SaveCustomer(Clientes customer)
        {
            bool result = false;

            var businessController = new CustomerBS(_dbContext);
            result = businessController.SaveCustomer(customer);

            return result;
        }

        public List<Clientes> GetByFilterCustomer(string nmCliente)
        {
            var businessController = new CustomerBS(_dbContext);
            List<Clientes> customer = businessController.GetByFilterCustomer(nmCliente);

            return customer;
        }

        public bool DeleteByIdCustomer(int idCustomer)
        {
            var businessController = new CustomerBS(_dbContext);
            return businessController.DeleteByIdCustomer(idCustomer);
        }
    }

    public interface ICustomerService
    {
        public Clientes GetByIdCustomer(int idCustomer);

        public bool SaveCustomer(Clientes customer);

        public List<Clientes> GetByFilterCustomer(string nmCliente);

        public bool DeleteByIdCustomer(int idCustomer);

        public void SetCurrentHttpContext(ClaimsPrincipal principal);
    }
}
