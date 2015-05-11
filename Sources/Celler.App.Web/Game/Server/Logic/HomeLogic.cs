// Celler (c) 2015 Krokodev
// Celler.App.Web
// HomeLogic.cs

using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Managers;

namespace Celler.App.Web.Game.Server.Logic
{
    internal class HomeLogic : IHomeLogic
    {
        #region Ctor

        public HomeLogic( IHomeManager homeManager )
        {
            _homeManager = homeManager;
        }

        #endregion


        #region IAuxLogic

        void IAuxLogic.Update()
        {
            // Do nothing
        }

        #endregion


        #region IHomeLogic

        void IHomeLogic.ReceiveLoot( Suit suit, double loot )
        {
            _homeManager.UpdateHomes(
                condition : home => home.ISuitable.Suit == suit,
                modificator : home => home.IValuable.Value += loot
                );
        }

        #endregion


        #region Fields

        private readonly IHomeManager _homeManager;

        #endregion
    }
}