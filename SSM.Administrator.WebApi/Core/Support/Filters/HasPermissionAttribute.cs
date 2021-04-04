using System;
using Microsoft.AspNetCore.Authorization;
using SSM.Administrator.Entity.Enumeration;

namespace SSM.Administrator.WebApi.Core.Support.Filters
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = false)]
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(Permission permission) : base(permission.ToString())
        { }
    }
}
