// Celler (c) 2015 Krokodev
// Celler.App.Web
// Food.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.Objects
{
    public class Food : AbstractSuitObject<FoodModel >
    {
        public override FoodModel ToModel()
        {
            return new FoodModel {
                Base = ToSuitObjectModel()
            };
        }
    }
}