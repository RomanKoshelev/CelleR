// Celler (c) 2015 Krokodev
// Celler.App.Web
// Home.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Home : GameObject< HomeModel >
    {
        protected override HomeModel ToModel()
        {
            return new HomeModel {
                Base = ToGameObjectModel()
            };
        }
    }
}