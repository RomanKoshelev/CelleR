// Celler (c) 2015 Krokodev
// Celler.App.Web
// FilterConfig.cs

using System.Web.Mvc;

namespace Celler.App.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters( GlobalFilterCollection filters )
        {
            filters.Add( new HandleErrorAttribute() );
        }
    }
}