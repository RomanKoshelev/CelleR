// Celler (c) 2015 Krokodev
// Celler.App.Web
// FoodLogic.cs

using System;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Managers;

namespace Celler.App.Web.Game.Server.Logic
{
    internal class FoodLogic : ISublogic
    {
        #region Constructors

        public FoodLogic( IGameManager game, IFoodManager foodManager )
        {
            Game = game;
            FoodManager = foodManager;
        }

        #endregion


        #region ISubLogic

        public void Update()
        {
            AddNewFoodIfNeed();
        }

        #endregion


        #region Fields

        private IFoodManager FoodManager { get; set; }

        private IGameManager Game { get; set; }

        private const double MinFoodSize = 20;

        private DateTime _lastTimeFoodAdded = DateTime.Now;
        private const int FoodCreationInterval = 10;

        #endregion


        #region Private Methods

        private void AddNewFoodIfNeed()
        {
            if( Game.CurrentTime - _lastTimeFoodAdded <= TimeSpan.FromSeconds( FoodCreationInterval ) ) {
                return;
            }
            _lastTimeFoodAdded = Game.CurrentTime;

            var m1 = FoodManager.AddFood( Suit.Blue, Point.RandomIn( Game.GetBounds() ), MinFoodSize ).ToModel();
            var m2 = FoodManager.AddFood( Suit.Red, Point.RandomIn( Game.GetBounds() ), MinFoodSize ).ToModel();

            Game.Clients.FoodAdded( m1 );
            Game.Clients.FoodAdded( m2 );
        }

        #endregion
    }
}