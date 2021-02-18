using Microsoft.AspNetCore.Mvc;

namespace SSM.Administrator.WebApi.Controllers
{
    [Route("api/public/init")]
    public class InitController : Controller
    {
        [HttpPost]
        public IActionResult Index()
        {
            return Ok(true);
        }
    }
}
