using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SSM.Administrator.WebApi.Core.Base
{
    //[ValidateModelFilter]
    public abstract class WebApiControllerBase : ControllerBase
    {
        public WebApiControllerBase() : base() { }

        public IActionResult Execute<T>(Func<T> action)
        {
            IActionResult response;
            String messageRequest = CreateLogMessageFromRequest();

            try
            {
                var result = action.Invoke();
                if (result != null)
                {
                    response = Ok(result);
                }
                else
                {
                    response = StatusCode(StatusCodes.Status204NoContent);
                    //status = Extraction.StatusExtractionEnum.NoData;
                }
            }
            catch (Exception ex)
            {
                //Logger.Fatal(messageRequest, ex);
                //SaveLog(Extraction.StatusExtractionEnum.Error, ex);
                return UnknownError(ex);
            }

            return response;
        }

        protected String CreateLogMessageFromRequest()
        {
            String action = this.HttpContext.Request.Path;
            String query = this.HttpContext.Request.QueryString.ToUriComponent();
            String methodMessage = String.Format("An error occurred while executing method '{0}' from the API.", action);
            String queryMessage = String.Format("With the following query String: '{0}'.", query);
            String logMessage = String.Format("{0}{1}", methodMessage, String.IsNullOrWhiteSpace(query) ? String.Empty : queryMessage);
            return logMessage;
        }

        protected IActionResult UnknownError(Exception ex)
        {
            //Logger.Fatal(CreateLogMessageFromRequest(), ex);
            base.BadRequest();

            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
