// Celler (c) 2015 Krokodev
// Celler.App.Web
// HomeController.cs

using System.Web.Mvc;

// Here: Controller | Home 

namespace Celler.App.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction( "Play", "Game" );
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