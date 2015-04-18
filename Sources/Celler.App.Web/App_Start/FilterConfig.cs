using System.Web;
using System.Web.Mvc;

namespace Research.Signalr.Typescript
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
