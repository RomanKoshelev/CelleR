// Celler (c) 2015 Krokodev
// Celler.App.Web
// IHomeManager.cs

using System;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Structs;

namespace Celler.App.Web.Game.Server.Managers
{
    public interface IHomeManager
    {
        Home AddHome( Suit suit, Point position, double size, double value, double maxValue  );
        void UpdateHomes( Func< Home, bool > condition, Action< Home > modificator );
    }
}