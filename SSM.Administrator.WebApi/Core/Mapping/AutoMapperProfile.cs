using AutoMapper;
using Microsoft.AspNetCore.Identity;
using SSM.Administrator.WebApi.Core.Models.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Core.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUserModel, IdentityUser>();

            CreateMap<IdentityUser, ApplicationUserModel>()
              .ForMember(u => u.Phone, opt => opt.MapFrom(i => i.PhoneNumber));

            CreateMap<ApplicationUserModel, IdentityUser>()
              .ForMember(i => i.PhoneNumber, opt => opt.MapFrom(u => u.Phone));
        }
    }
}
