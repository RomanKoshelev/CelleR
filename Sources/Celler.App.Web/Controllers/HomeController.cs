// Crimenuts (c) 2015 Crocodev
// Research.Signalr.Typescript
// HomeController.cs
// Roman, 2015-03-29 7:27 PM

using System.Web.Mvc;

namespace Research.Signalr.Typescript.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Chat()
        {
            return View();
        }
    }
}