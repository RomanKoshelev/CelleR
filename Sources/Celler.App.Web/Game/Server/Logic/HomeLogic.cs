// Celler (c) 2015 Krokodev
// Celler.App.Web
// HomeLogic.cs

using Celler.App.Web.Game.Server.Managers;

namespace Celler.App.Web.Game.Server.Logic
{
    internal class HomeLogic : IHomeLogic
    {
        #region Ctor

        public HomeLogic( IGameLogic game, IHomeManager homeManager )
        {
            _game = game;
            _homeManager = homeManager;
        }

        #endregion


        #region IAuxLogic

        void IAuxLogic.Update()
        {
            // Do nothing
        }

        #endregion


        #region Fileds

        private IGameLogic _game;
        private IHomeManager _homeManager;

        #endregion
    }
}