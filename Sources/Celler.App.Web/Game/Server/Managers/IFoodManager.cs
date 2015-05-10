// Celler (c) 2015 Krokodev
// Celler.App.Web
// IFoodManager.cs

using System;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;

namespace Celler.App.Web.Game.Server.Managers
{
    public interface IFoodManager
    {
        Food AddFood( Suit suit, Point position, double size );
        void RemoveFood( Food food );
        int GetFoodCount();
        void UpdateFoods( Action< Food > action );
    }
}