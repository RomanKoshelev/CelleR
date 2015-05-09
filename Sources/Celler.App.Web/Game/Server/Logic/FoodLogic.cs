// Celler (c) 2015 Krokodev
// Celler.App.Web
// FoodLogic.cs

using System;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Managers;

namespace Celler.App.Web.Game.Server.Logic
{
    internal class FoodLogic : IAuxLogic
    {
        #region Ctor

        public FoodLogic( IGameLogic game, ITimeLogic timer, ICollisionLogic collider, IFoodManager foodManager )
        {
            _timer = timer;
            _game = game;
            _foodManager = foodManager;
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

        private const int FoodCreationInterval = 5;

        #endregion


        #region Fields

        private readonly ITimeLogic _timer;
        private readonly IGameLogic _game;
        private readonly IFoodManager _foodManager;
        private DateTime _lastTimeFoodAdded = DateTime.Now;

        #endregion


        #region Methods

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
            _foodManager.RemoveFood( food );
        }

        private void AddNewFoodIfNeed()
        {
            if( _timer.CurrentTime - _lastTimeFoodAdded <= TimeSpan.FromSeconds( FoodCreationInterval ) ) {
                return;
            }
            _lastTimeFoodAdded = _timer.CurrentTime;

            _foodManager.AddFood( Suit.Blue, Point.RandomIn( _game.GetBounds() ), MinFoodSize );
            _foodManager.AddFood( Suit.Red, Point.RandomIn( _game.GetBounds() ), MinFoodSize );
        }

        #endregion
    }
}