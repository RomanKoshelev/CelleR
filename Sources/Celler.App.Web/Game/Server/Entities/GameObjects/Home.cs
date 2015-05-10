// Celler (c) 2015 Krokodev
// Celler.App.Web
// Home.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Home : ValuableGameObject< HomeModel >
    {
        #region Ctor

        public Home( Suit suit, Point position, double size, double value = 0 )
            : base( suit, position, size, value ) {}

        #endregion


        #region Overrides

        protected override HomeModel ToModel()
        {
            return new HomeModel {
                Base = ToGameObjectModel()
            };
        }

        #endregion
    }
}