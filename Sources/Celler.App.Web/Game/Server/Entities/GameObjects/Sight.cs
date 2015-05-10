// Celler (c) 2015 Krokodev
// Celler.App.Web
// Sight.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Sight : GameObject< SightModel >, ISight
    {
        #region Ctor

        public Sight( Suit suit, Point position, double size )
            : base( suit, position, size ) {}

        #endregion


        #region ISight

        public ISight ISight
        {
            get { return this; }
        }

        string ISight.CellId { get; set; }

        #endregion


        #region Overrides

        protected override SightModel ToModel()
        {
            return new SightModel {
                CellId = ISight.CellId,
                Base = ToGameObjectModel()
            };
        }

        #endregion
    }
}