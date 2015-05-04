// Celler (c) 2015 Krokodev
// Celler.App.Web
// Cell.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Cell : SuitObject
    {
        public new CellModel ToModel()
        {
            return new CellModel {
                SuitObject = ( this as SuitObject ).ToModel()
            };
        }
    }
}