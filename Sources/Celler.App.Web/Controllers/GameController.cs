// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameController.cs

using System.Web.Mvc;

// Here: Controller | Game

namespace Celler.App.Web.Controllers
{
    public class GameController : Controller
    {
        public ActionResult Play()
        {
            return View();
        }
    }
}