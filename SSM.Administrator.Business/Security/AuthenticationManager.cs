using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SSM.Administrator.Business.Global;
using SSM.Administrator.Data;
using SSM.Administrator.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SSM.Administrator.Business
{
    public class AuthenticationManager : BaseBusiness
    {
        public AuthenticationManager() { }
        public AuthenticationManager(DataContextSet dbContext)
        {
            _dbContext = dbContext;
        }

        public void RetrieveProfileByCredentials(String login, String password)
        {
            //var userProfile = new DateTime();

            var dataNetUsers = _dbContext.AspNetUsers.OrderBy(a => a.Email).ToList();

            var dataSession = _dbContext.Session.ToList();
            string pLoginName = "xx";
            string pPassword = "zz";
            string responseMessage = null;
            var pLoginNameParam = new SqlParameter("@pLoginName", "xx");
            var pPasswordParam = new SqlParameter("@pPassword", "yy");
            var responseMessageParam = new SqlParameter("@responseMessage", SqlDbType.NVarChar, 250) { Direction = ParameterDirection.Output };

            _dbContext.Database.ExecuteSqlRaw("exec adm.SPR_CHECK_LOGIN @pLoginName={0}, @pPassword={1},  @responseMessage={2} out", pLoginNameParam, pPasswordParam, responseMessageParam);
            //var dataSession = _dbContext.AspNetUsers.FromSqlInterpolated($"exec adm.SPR_CHECK_LOGIN {pLoginName}, {pPassword},  {responseMessage} out");

            if (responseMessageParam.Value != DBNull.Value)
            {
                responseMessage = (string)responseMessageParam.Value;
            }
            //var dataSession = _dbContext.AspNetUsers.FromSqlInterpolated(@$"Set NOCOUNT ON
            //declare @responseMessage NVARCHAR(250) 
            //exec @responseMessage = adm.SPR_CHECK_LOGIN '{pLoginName}', '{pPassword}',  '{responseMessage}'
            //select @responseMessage as message");
            //OrderBy(a => a.Login).ToList();
            //string employeeCount = (string)output.Value;
            //using (var context = new DataContextSet())
            //{
            //    var blogs = context.AspNetUsers.ToList();
            //}

            //_dbContext.Database.CurrentTransaction.
            //foreach (var group in dataNetUsers)
            //{
            //    var xx = group.Email;
            //    //group.Key is the CategoryId value

            //}
            //return userProfile;
        }
    }
}
