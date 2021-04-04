﻿using SSM.Administrator.Entity.Enumeration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Support.Handlers
{
    public static class PermissionPackers
    {
        public static string PackPermissionsIntoString(this IEnumerable<Permission> permissions)
        {
            return permissions.Aggregate("", (s, permission) => s + (char)permission);
        }

        public static IEnumerable<Permission> UnpackPermissionsFromString(this string packedPermissions)
        {
            if (packedPermissions == null)
                throw new ArgumentNullException(nameof(packedPermissions));
            foreach (var character in packedPermissions)
            {
                yield return ((Permission)character);
            }
        }

        public static Permission? FindPermissionViaName(this string permissionName)
        {
            return Enum.TryParse(permissionName, out Permission permission)
                ? (Permission?)permission
                : null;
        }
    }
}
