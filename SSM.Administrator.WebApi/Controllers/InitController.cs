using Microsoft.AspNetCore.Mvc;

namespace SSM.Administrator.WebApi.Controllers
{
    [Route("public/init")]
    public class InitController : Controller
    {
        [HttpPost]
        [IgnoreAntiforgeryToken]
        public IActionResult Index()
        {
            return Ok(true);
        }
    }
}
