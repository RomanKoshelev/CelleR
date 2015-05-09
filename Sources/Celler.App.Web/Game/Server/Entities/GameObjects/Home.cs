// Celler (c) 2015 Krokodev
// Celler.App.Web
// Home.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.Objects
{
    public class Home : AbstractSuitObject<HomeModel>
    {
        public override HomeModel ToModel()
        {
            return new HomeModel {
                Base = ToSuitObjectModel()
            };
        }
    }
}