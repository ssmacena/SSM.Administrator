using SSM.Administrator.Business.Global;
using SSM.Administrator.Data;
using SSM.Administrator.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SSM.Administrator.Business
{
    public class CustomerBS : BaseBusiness
    {
        public CustomerBS() { }
        public CustomerBS(DataContextSet dbContext)
        {
            _dbContext = dbContext;
        }

        public Clientes GetByIdCustomer(int idCustomer)
        {
            Clientes customer = _dbContext.SJSS_Customer.Find(idCustomer);
            return customer;
        }

        public bool SaveCustomer(Clientes customer)
        {
            bool result = false;

            try
            {
                if (customer.Id != 0)
                {
                    customer.DataAlteracao = DateTime.Now;
                    _dbContext.Entry(customer).State = EntityState.Modified;
                    _dbContext.SJSS_Customer.Attach(customer);
                    _dbContext.SaveChanges();
                }
                else
                {
                    customer.DataCriacao = DateTime.Now;
                    _dbContext.SJSS_Customer.Add(customer);
                    _dbContext.SaveChanges();
                }
                result = true;
            }
            catch (Exception ex)
            {
                result = false;
            }

            return result;
        }

        public List<Clientes> GetByFilterCustomer(string nmCliente)
        {
            List<Clientes> customer = _dbContext.SJSS_Customer.Where(x => EF.Functions.Like(x.Nome, "$%{nmCliente}%")).ToList();
            return customer;
        }

        public bool DeleteByIdCustomer(int idCustomer)
        {
            bool result = false;

            try
            {
                Clientes customer = _dbContext.SJSS_Customer.Find(idCustomer);
                _dbContext.SJSS_Customer.Remove(customer);
                _dbContext.SaveChanges();
                result = true;
            }
            catch (Exception ex)
            {
                result = false;
            }

            return result;
        }
    }
}
