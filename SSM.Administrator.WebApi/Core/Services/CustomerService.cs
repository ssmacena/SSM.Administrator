using AutoMapper;
using Microsoft.AspNetCore.Http;
using SSM.Administrator.Business;
using SSM.Administrator.Entity;
using SSM.Administrator.WebApi.Core.Base;
using System.Collections.Generic;

namespace SSM.Administrator.WebApi.Core.Services
{
    public class CustomerService : BaseService
    {
        public CustomerService(HttpContext httpContext, IMapper mapper) : base(httpContext, mapper) { }

        public Clientes GetByIdCustomer(int idCustomer)
        {
            Clientes customer = null;

            var businessController = CreateBusiness<CustomerBS>();
            customer = businessController.GetByIdCustomer(idCustomer);

            return customer;
        }

        public List<Clientes> GetAll()
        {
            List<Clientes> customer = null;
            
            var businessController = CreateBusiness<CustomerBS>();
            customer = businessController.GetAll();

            return customer;
        }

        public bool SaveCustomer(Clientes customer)
        {
            bool result = false;

            var businessController = CreateBusiness<CustomerBS>();
            result = businessController.SaveCustomer(customer);

            return result;
        }

        public List<Clientes> GetByFilterCustomer(string nmCliente)
        {
            var businessController = CreateBusiness<CustomerBS>();
            List<Clientes> customer = businessController.GetByFilterCustomer(nmCliente);

            return customer;
        }

        public bool DeleteByIdCustomer(int idCustomer)
        {
            var businessController = CreateBusiness<CustomerBS>();
            return businessController.DeleteByIdCustomer(idCustomer);
        }
    }
}
