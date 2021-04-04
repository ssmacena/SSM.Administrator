using System;
using System.ComponentModel.DataAnnotations;

namespace SSM.Administrator.Entity.Enumeration
{
    public enum Permission : short
    {
        NotSet = 0, //error condition

        [Display(GroupName = "SuperAdmin", Name = "AccessAll", Description = "This allows the user to access every feature")]
        AccessAll = Int16.MaxValue,
    }
}
