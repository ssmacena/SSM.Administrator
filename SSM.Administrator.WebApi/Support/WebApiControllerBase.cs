using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SSM.Administrator.Business.Global;
using SSM.Administrator.Data;
using SSM.Administrator.Entity;
using System;
using System.Collections.Generic;

namespace SSM.Administrator.WebApi.Support
{
    //[ValidateModelFilter]
    public abstract class WebApiControllerBase : ControllerBase
    {
        private readonly DataContextSet _dbContext;
        protected DataContextSet DbContext => (DataContextSet)HttpContext.RequestServices.GetService(typeof(DataContextSet));
        protected List<Permission> CurrentUserPermissions { get; private set; }
        protected String CurrentUserId { get; set; }


        public WebApiControllerBase()
            : base()
        {
            LoadPermissions();
        }

        public WebApiControllerBase(DataContextSet dbContext)
        {
            _dbContext = dbContext;
        }

        protected void LoadPermissions()
        {
            this.CurrentUserId = null;
        }

        protected T CreateBusiness<T>()
            where T : BaseBusiness, new()
        {
            //T business = new T ();
            T business = (T)Activator.CreateInstance(typeof(T), DbContext);
            business.SetCurrentUser(this.CurrentUserId);
            business.SetCurrentUserInformation(this.CurrentUserPermissions);
            return business;
        }

        protected T CreateManager<T>()
            where T : BaseBusiness, new()
        {
            T business = new T();
            //business.SetCurrentUser(this.UserProfile, new DataContextSet(), new AuthData { Login = this.UserProfile.Login, Token = UserProfile.Token });
            return business;
        }

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

        //public void SetCurrentUser(String currentUserId)
        //{
        //    this.CurrentUserId = currentUserId;
        //}

        //public void SetCurrentUserInformation(ICollection<Permission> permissions)
        //{
        //    this.CurrentUserPermissions = new List<Permission>();

        //    if (permissions != null)
        //        this.CurrentUserPermissions.AddRange(permissions);
        //}

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
