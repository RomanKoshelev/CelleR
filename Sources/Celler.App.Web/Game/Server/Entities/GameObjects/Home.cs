// Celler (c) 2015 Krokodev
// Celler.App.Web
// Home.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Home : ValuableGameObject< HomeModel >, IHome
    {
        #region Ctor

        public Home( Suit suit, Point position, double size, double value, double maxValue )
            : base( suit, position, size, value, maxValue )
        {
        }

        #endregion


        #region IHome

        public IHome IHome
        {
            get { return this; }
        }

        #endregion


        #region Overrides

        protected override HomeModel ToModel()
        {
            return new HomeModel {
                Value = IValuable.Value,
                MaxValue = IValuable.MaxValue,
                Base = ToGameObjectModel()
            };
        }

        #endregion


    }
}