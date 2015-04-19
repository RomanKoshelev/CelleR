// Celler (c) 2015 Krokodev
// Celler.App.Web
// HomeController.cs

using System.Web.Mvc;

// Here: Controller : Home 

namespace Celler.App.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction( "Index", "Game" );
        }

        public ActionResult Chat()
        {
            return View();
        }

        public ActionResult Rules()
        {
            return View();
        }

        public ActionResult Contacts()
        {
            return View();
        }

        public ActionResult Sources()
        {
            return View();
        }
    }
}