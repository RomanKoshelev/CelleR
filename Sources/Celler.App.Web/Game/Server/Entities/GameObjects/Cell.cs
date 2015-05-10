// Celler (c) 2015 Krokodev
// Celler.App.Web
// Cell.cs

using System;
using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Cell : GameObject< CellModel >, ICell
    {
        #region Ctor

        public Cell( Suit suit, Point position, double size )
            :base(suit, position, size )
        {
        }

        #endregion


        #region ICell

        public ICell ICell
        {
            get { return this; }
        }

        string ICell.HomeId { get; set; }
        string ICell.SightId { get; set; }

        #endregion


        #region Overrrides

        protected override CellModel ToModel()
        {
            return new CellModel {
                HomeId = ICell.HomeId,
                SightId = ICell.SightId,
                Base = ToGameObjectModel()
            };
        }

        #endregion
    }
}