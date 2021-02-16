using Microsoft.AspNetCore.Mvc;

namespace SSM.Administrator.WebApi.Controllers
{
    [Route("public/init")]
    public class InitController : Controller
    {
        [Route("index")]
        [HttpGet]
        public IActionResult Index()
        {
            return Ok(true);
        }
    }
}
