// Celler (c) 2015 Krokodev
// Celler.App.Web
// IFoodManager.cs

using Celler.App.Web.Game.Server.Entities;

namespace Celler.App.Web.Game.Server.Managers
{
    public interface IFoodManager
    {
        Food AddFood( Suit suit, Point position, double size );
    }
}