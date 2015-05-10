// Celler (c) 2015 Krokodev
// Celler.App.Web
// Food.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Food : GameObject< FoodModel >, IFood
    {
        #region Ctor

        public Food( Suit suit, Point position, double size )
            : base( suit, position, size ) {}

        #endregion


        #region IFood

        public IFood IFood
        {
            get { return this; }
        }

        double IFood.Weight { get; set; }

        #endregion


        #region Overrides

        protected override FoodModel ToModel()
        {
            return new FoodModel {
                Base = ToGameObjectModel()
            };
        }

        #endregion
    }
}