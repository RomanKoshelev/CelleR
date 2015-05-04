// Celler (c) 2015 Krokodev
// Celler.App.Web
// Sight.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Sight : SuitObject
    {
        public new SightModel ToModel()
        {
            return new SightModel {
                Base = base.ToModel()
            };
        }
    }
}