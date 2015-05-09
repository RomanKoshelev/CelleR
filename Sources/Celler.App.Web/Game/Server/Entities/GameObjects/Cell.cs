// Celler (c) 2015 Krokodev
// Celler.App.Web
// Cell.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Cell : AbstractSuitObject< CellModel >, ICell
    {
        #region ICell

        public ICell ICell {
            get { return this; }
        }

        string ICell.HomeId { get; set; }
        string ICell.SightId { get; set; }

        #endregion



        #region AbstractEntity

        public override CellModel ToModel()
        {
            return new CellModel {
                HomeId = ICell.HomeId,
                SightId = ICell.SightId,
                Base = ToSuitObjectModel()
            };
        }

        #endregion

    }
}