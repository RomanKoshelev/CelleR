// Celler (c) 2015 Krokodev
// Celler.App.Web
// Food.cs

using System;
using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Food : ValuableGameObject< FoodModel >, IFood
    {
        #region Ctor

        public Food( Suit suit, Point position, double size, DateTime time, double minValue, double maxValue, double period )
            : base( suit, position, size, value : 0 )
        {
            IFood.CreationTime = time;
            IFood.MinValue = minValue;
            IFood.MaxValue = maxValue;
            IFood.ValuePeriod = period;
        }

        #endregion


        #region IFood

        public IFood IFood
        {
            get { return this; }
        }

        DateTime IFood.CreationTime { get; set; }
        double IFood.MaxValue { get; set; }
        double IFood.ValuePeriod { get; set; }
        double IFood.MinValue { get; set; }

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