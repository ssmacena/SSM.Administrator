using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi.Controllers
{
    [Route("public/init")]
    public class InitController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
