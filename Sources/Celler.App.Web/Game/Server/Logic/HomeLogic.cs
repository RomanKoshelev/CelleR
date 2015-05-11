// Celler (c) 2015 Krokodev
// Celler.App.Web
// HomeLogic.cs

using System;
using Celler.App.Web.Game.Server.Config;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Structs;
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


        #region IHomeLogic

        void IHomeLogic.ReceiveLootToHome( Suit suit, double loot )
        {
            _homeManager.UpdateHomes(
                condition : home => home.ISuitable.Suit == suit,
                modificator : home => {
                    home.IValuable.Value += loot;
                    home.IValuable.Value = Math.Max( home.IValuable.Value, 0 );
                    home.IValuable.Value = Math.Min( home.IValuable.Value, home.IValuable.MaxValue );
                } );
        }

        Home IHomeLogic.AddHome( Suit suit )
        {
            return _homeManager.AddHome( suit, GetCornerCoords( suit ), HomeSize, HomeIniLoot, HomeMaxLoot );
        }

        #endregion


        #region Consts

        private const double HomeIniLoot = Settings.Loot.Home.Init;
        private const double HomeMaxLoot = Settings.Loot.Home.Max;
        private const double HomeSize = Settings.World.Home.Size;

        #endregion


        #region Fields

        private readonly IHomeManager _homeManager;
        private readonly IGameLogic _game;

        #endregion


        #region Utils

        private Point GetCornerCoords( Suit suit )
        {
            var world = _game.GetWorldBounds();

            const double margin = HomeSize/2;
            switch( suit ) {
                case Suit.Blue :
                    return new Point( margin, world.Width - margin );
                case Suit.Red :
                    return new Point( world.Height - margin, margin );
            }
            return new Point();
        }

        #endregion
    }
}