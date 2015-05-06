// Celler (c) 2015 Krokodev
// Celler.App.Web
// FoodLogic.cs

using System;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Managers;

namespace Celler.App.Web.Game.Server.Logic
{
    internal class FoodLogic : ISubLogic
    {
        public FoodLogic( IGameManager game, IFoodManager foodManager )
        {
            Game = game;
            FoodManager = foodManager;
        }

        public IGameLogic GameLogic { get; set; }

        public IFoodManager FoodManager { get; set; }

        private IGameManager Game { get; set; }

        private const double MinFoodSize = 20;

        public void Update()
        {
            if( Game.TimeAfterLastUpdate <= TimeSpan.FromSeconds( 2 ) ) {
                return;
            }
            var m1 = FoodManager.AddFood( Suit.Blue, Point.RandomIn( Game.GetBounds() ), MinFoodSize ).ToModel();
            var m2 = FoodManager.AddFood( Suit.Red, Point.RandomIn( Game.GetBounds() ), MinFoodSize ).ToModel();

            Game.Clients.FoodAdded( m1 );
            Game.Clients.FoodAdded( m2 );
        }
    }
}