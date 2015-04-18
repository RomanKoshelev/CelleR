// Celler (c) 2015 Krokodev
// Celler.App.Web
// RouteConfig.cs

using System.Web.Mvc;
using System.Web.Routing;

namespace Celler.App.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes( RouteCollection routes )
        {
            routes.IgnoreRoute( "{resource}.axd/{*pathInfo}" );

            routes.MapRoute(
                name : "Default",
                url : "{controller}/{action}/{id}",
                defaults : new { controller = "Home", action = "Index", id = UrlParameter.Optional }
                );
        }
    }
}