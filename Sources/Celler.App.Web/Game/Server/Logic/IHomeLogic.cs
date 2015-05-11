// Celler (c) 2015 Krokodev
// Celler.App.Web
// IHomeLogic.cs

using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;

namespace Celler.App.Web.Game.Server.Logic
{
    internal interface IHomeLogic: IAuxLogic  {
        void ReceiveLootToHome( Suit suit, double loot );
        Home AddHome( Suit suit );
    }
}