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

        public SJSS_Customer GetByIdCustomer(int idCustomer)
        {
            SJSS_Customer customer = _dbContext.SJSS_Customer.Find(idCustomer);
            return customer;
        }

        public bool SaveCustomer(SJSS_Customer customer)
        {
            bool result = false;

            try
            {
                if (customer.Id != 0)
                {
                    customer.DT_Alteracao = DateTime.Now;
                    _dbContext.Entry(customer).State = EntityState.Modified;
                    _dbContext.SJSS_Customer.Attach(customer);
                    _dbContext.SaveChanges();
                }
                else
                {
                    customer.DT_Criacao = DateTime.Now;
                    _dbContext.SJSS_Customer.Attach(customer);
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

        public List<SJSS_Customer> GetByFilterCustomer(string nmCliente)
        {
            List<SJSS_Customer> customer = _dbContext.SJSS_Customer.Where(x => EF.Functions.Like(x.NM_Cliente, "$%{nmCliente}%")).ToList();
            return customer;
        }

        public bool DeleteByIdCustomer(int idCustomer)
        {
            bool result = false;

            try
            {
                SJSS_Customer customer = _dbContext.SJSS_Customer.Find(idCustomer);
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
