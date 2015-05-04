// Celler (c) 2015 Krokodev
// Celler.App.Web
// Home.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Home : SuitObject
    {
        public new HomeModel ToModel()
        {
            return new HomeModel {
                Base = base.ToModel()
            };
        }
    }
}