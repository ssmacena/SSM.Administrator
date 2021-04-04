using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Constants
{
    public static class AppConstants
    {
        public const string PackedPermissionClaimType = "Permissions";

        public const string XsrfHeader = "X-XSRF-Token";                    
        public const string XsrfCookie = "x-xsrf-token";
    }
}
