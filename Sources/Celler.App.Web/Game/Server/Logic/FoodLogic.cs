// Celler (c) 2015 Krokodev
// Celler.App.Web
// FoodLogic.cs

using System;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Managers;

namespace Celler.App.Web.Game.Server.Logic
{
    internal class FoodLogic : IAuxLogic
    {
        #region Constructors

        public FoodLogic( IGameLogic game, ITimeLogic timer, ICollisionLogic collider, IFoodManager foodManager )
        {
            _timer = timer;
            _game = game;
            FoodManager = foodManager;
            collider.onCollision += onCollision;
        }

        #endregion


        #region IAuxLogic

        void IAuxLogic.Update()
        {
            AddNewFoodIfNeed();
        }

        #endregion


        #region Constants

        private const double MinFoodSize = 20;

        private const int FoodCreationInterval = 10;

        #endregion


        #region Private Fields

        private readonly ITimeLogic _timer;
        private readonly IGameLogic _game;
        private IFoodManager FoodManager { get; set; }
        private DateTime _lastTimeFoodAdded = DateTime.Now;

        #endregion


        #region Private Methods

        private void onCollision( IBody a, IBody b )
        {
            if( a is Food && b is Cell ) {
                ProcCollisionFoodWithCell( a as Food, b as Cell );
            } else if( b is Food && a is Cell ) {
                ProcCollisionFoodWithCell( b as Food, a as Cell );
            }
        }

        private void ProcCollisionFoodWithCell( Food food, Cell cell )
        {
            FoodManager.RemoveFood( food );
        }

        private void AddNewFoodIfNeed()
        {
            if( _timer.CurrentTime - _lastTimeFoodAdded <= TimeSpan.FromSeconds( FoodCreationInterval ) ) {
                return;
            }
            _lastTimeFoodAdded = _timer.CurrentTime;

            FoodManager.AddFood( Suit.Blue, Point.RandomIn( _game.GetBounds() ), MinFoodSize ).ToModel();
            FoodManager.AddFood( Suit.Red, Point.RandomIn( _game.GetBounds() ), MinFoodSize ).ToModel();
        }

        #endregion
    }
}