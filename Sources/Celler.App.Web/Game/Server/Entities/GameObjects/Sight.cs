// Celler (c) 2015 Krokodev
// Celler.App.Web
// Sight.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.Objects
{
    public class Sight : AbstractSuitObject<SightModel>
    {
        public string CellId { get; set; }

        public override SightModel ToModel()
        {
            return new SightModel {
                CellId = CellId,
                Base = ToSuitObjectModel()
            };
        }
    }
}