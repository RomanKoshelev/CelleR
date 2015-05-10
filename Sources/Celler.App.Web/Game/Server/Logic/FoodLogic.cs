// Celler (c) 2015 Krokodev
// Celler.App.Web
// FoodLogic.cs

using System;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Managers;
using Celler.App.Web.Game.Server.Utils;

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
            UpdateFood();
        }

        #endregion


        #region Constants

        private const double MinFoodValue = 0.01;
        private const double MaxFoodValue = 1.00;
        private const double MinFoodSize = 5;
        private const double MaxFoodSize = 100;
        private const double MaxFoodFrequancy = 1/2.0;
        private const double MinFoodFrequancy = 1/50.0;
        private const int FoodCreationInterval = 2;
        private const int MaxFoodCount = 5;

        #endregion


        #region Fields

        private readonly ITimeLogic _timer;
        private readonly IGameLogic _game;
        private readonly IFoodManager _foodManager;
        private DateTime _lastTimeFoodAdded = DateTime.Now;
        private static readonly Random Random = new Random();

        #endregion


        #region Event Handlers

        private void onCollision( IBody a, IBody b )
        {
            if( a is Food && b is Cell ) {
                ProcCollisionFoodWithCell( a as Food );
            } else if( b is Food && a is Cell ) {
                ProcCollisionFoodWithCell( b as Food );
            }
        }

        #endregion


        #region Creation

        private void AddNewFoodIfNeed()
        {
            if( NeedToAddFood() ) {
                AddFood(
                    suit : CalcRandomSuit(),
                    position : CalcRandomPosition(),
                    maxValue : CalcRandomMaxValue(),
                    frequency : CalcRandomFrequency() );
            }
        }

        private bool NeedToAddFood()
        {
            return TimePermitsFoodCreation() && FoodCountPermitsFoodCreation();
        }

        private bool FoodCountPermitsFoodCreation()
        {
            return _foodManager.GetFoodCount() < MaxFoodCount;
        }

        private bool TimePermitsFoodCreation()
        {
            if( _timer.CurrentTime - _lastTimeFoodAdded <= TimeSpan.FromSeconds( FoodCreationInterval ) ) {
                return false;
            }
            _lastTimeFoodAdded = _timer.CurrentTime;
            return true;
        }

        private void AddFood( Suit suit, Point position, double maxValue, double frequency )
        {
            _foodManager.AddFood( suit, position, MinFoodSize, _timer.CurrentTime, maxValue, frequency );
        }

        #endregion


        #region Eating

        private void ProcCollisionFoodWithCell( Food food )
        {
            RemoveFeed( food );
        }

        private void RemoveFeed( Food food )
        {
            _foodManager.RemoveFood( food );
        }

        #endregion


        #region Updating

        private void UpdateFood()
        {
            _foodManager.UpdateFoods( FoodModificator );
        }

        private void FoodModificator( Food food )
        {
            food.IValuable.Value = CalcFoodValue( food, _timer.CurrentTime );
            food.IBody.Size = CalcFoodSize( food );
        }

        private static double CalcFoodSize( Food food )
        {
            var square = food.IValuable.Value/MaxFoodValue;
            var size = Math.Sqrt( square );
            return Calc.Proportion( MinFoodSize, MaxFoodSize, size );
        }

        private static double CalcFoodValue( Food food, DateTime currentTime )
        {
            var duration = currentTime - food.IFood.CreationTime;
            return Calc.Harmonics( 0, food.IFood.MaxValue, duration.TotalSeconds, food.IFood.ValueFrequency );
        }

        #endregion


        #region Utils

        private static Suit CalcRandomSuit()
        {
            return Random.Next( 2 ) == 0 ? Suit.Blue : Suit.Red;
        }

        private static double CalcRandomFrequency()
        {
            return Calc.Proportion( MinFoodFrequancy, MaxFoodFrequancy, Random.NextDouble() );
        }

        private static double CalcRandomMaxValue()
        {
            return Calc.Proportion( MinFoodValue, MaxFoodValue, Random.NextDouble() );
        }

        private Point CalcRandomPosition()
        {
            return Point.RandomIn( _game.GetBounds() );
        }

        #endregion
    }
}