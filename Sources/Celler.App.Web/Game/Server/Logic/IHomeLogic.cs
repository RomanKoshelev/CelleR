// Celler (c) 2015 Krokodev
// Celler.App.Web
// IHomeLogic.cs

using Celler.App.Web.Game.Server.Entities.Enums;

namespace Celler.App.Web.Game.Server.Logic
{
    internal interface IHomeLogic: IAuxLogic  {
        void ReceiveLoot( Suit suit, double loot );
    }
}