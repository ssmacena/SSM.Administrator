using Microsoft.AspNetCore.Http;
using SSM.Administrator.Business.Global;
using SSM.Administrator.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace SSM.Administrator.WebApi.Core.Base
{
    public class BaseService
    {
        private readonly HttpContext _httpContext;
        private readonly DataContextSet _dbContext;
        protected String CurrentUserId { get; set; }
        protected List<String> CurrentUserPermissions { get; private set; }
        public BaseService(HttpContext httpContext)
        {
            _httpContext = httpContext;
            _dbContext = (DataContextSet)httpContext.RequestServices.GetService(typeof(DataContextSet));
            LoadPermissions();
        }

        private void LoadPermissions()
        {
            this.CurrentUserId = null;
            this.CurrentUserPermissions = new List<String>();

            if (_httpContext.Request != null)
            {
                ClaimsPrincipal principal = this._httpContext.User;
                if (principal != null && principal.Claims != null)
                {
                    var userIdClaim = principal.Claims.Where(c => c.Type == ClaimTypes.Name).SingleOrDefault();
                    if (userIdClaim != null)
                        this.CurrentUserId = userIdClaim.Value;

                    var permissionsClaim = principal.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
                    if (permissionsClaim != null)
                        this.CurrentUserPermissions = permissionsClaim;
                }
            }
        }

        protected T CreateBusiness<T>()
            where T : BaseBusiness, new()
        {
            T business = (T)Activator.CreateInstance(typeof(T), _dbContext);
            business.SetCurrentUser(this.CurrentUserId);
            business.SetCurrentUserInformation(this.CurrentUserPermissions);

            return business;
        }
    }
}
