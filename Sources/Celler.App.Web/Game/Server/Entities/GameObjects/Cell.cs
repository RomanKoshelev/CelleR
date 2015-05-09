// Celler (c) 2015 Krokodev
// Celler.App.Web
// Cell.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Cell : AbstractSuitObject< CellModel >
    {
        public string HomeId { get; set; }
        public string SightId { get; set; }

        public override CellModel ToModel()
        {
            return new CellModel {
                HomeId = HomeId,
                SightId = SightId,
                Base = ToSuitObjectModel()
            };
        }
    }
}