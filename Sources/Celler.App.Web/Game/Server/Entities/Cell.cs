// Celler (c) 2015 Krokodev
// Celler.App.Web
// Cell.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Cell : SuitObject
    {
        public string HomeId { get; set; }
        public string SightId { get; set; }

        public new CellModel ToModel()
        {
            return new CellModel {
                HomeId = HomeId,
                SightId = SightId,
                Base = base.ToModel()
            };
        }
    }
}