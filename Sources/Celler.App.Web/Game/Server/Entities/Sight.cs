// Celler (c) 2015 Krokodev
// Celler.App.Web
// Sight.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Sight : SuitObject
    {
        public string CellId { get; set; }
        public new SightModel ToModel()
        {
            return new SightModel {
                CellId = CellId,
                Base = base.ToModel()
            };
        }
    }
}