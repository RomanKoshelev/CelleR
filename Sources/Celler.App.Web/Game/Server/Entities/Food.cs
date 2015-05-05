// Celler (c) 2015 Krokodev
// Celler.App.Web
// Food.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Food : SuitObject
    {
        public new FoodModel ToModel()
        {
            return new FoodModel {
                Base = base.ToModel()
            };
        }
    }
}