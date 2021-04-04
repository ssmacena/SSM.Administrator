using Microsoft.AspNetCore.Mvc;
using System;

namespace SSM.Administrator.WebApi.Core.Support.Filters
{
    [AttributeUsage(AttributeTargets.Method)]
    public class ApiAuthorizationAttribute : TypeFilterAttribute
    {
        public ApiAuthorizationAttribute()
            : base(typeof(ApiAuthorization)) { }
    }
}
