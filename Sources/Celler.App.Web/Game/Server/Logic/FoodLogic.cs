// Celler (c) 2015 Krokodev
// Celler.App.Web
// FoodLogic.cs

using System;
using Celler.App.Web.Game.Server.Config;
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

        private const double MaxFoodPeriod = Settings.Dynamic.Food.Ocscilation.MaxPeriod;
        private const double MinFoodPeriod = Settings.Dynamic.Food.Ocscilation.MinPeriod;
        private const double MinFoodValue = Settings.Loot.Food.Min;
        private const double MaxFoodValue = Settings.Loot.Food.Max;
        private const int FoodCreationInterval = Settings.Dynamic.Food.Creation.Interval;
        private const int MaxFoodCount = Settings.Dynamic.Food.Creation.MaxCount;
        
        private const double MinFoodSize = Settings.World.Food.MinSize;
        private const double MaxFoodSize = Settings.World.Food.MaxSize;

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
                FoodCollidesCell( a as Food );
            } else if( b is Food && a is Cell ) {
                FoodCollidesCell( b as Food );
            }
        }

        #endregion


        #region Creation

        private void AddNewFoodIfNeed()
        {
            if( !NeedToAddFood() ) {
                return;
            }
            var maxValue = CalcRandomMaxValue();
            var minValue = CalcRandomMinValue( maxValue );
            AddFood(
                suit : CalcRandomSuit(),
                position : CalcRandomPosition(),
                minValue : minValue,
                maxValue : maxValue,
                period : CalcRandomPeriod() );
        }

        private void AddFood( Suit suit, Point position, double minValue, double maxValue, double period )
        {
            _foodManager.AddFood(
                suit : suit,
                position : position,
                size : CalcFoodSize( MinFoodValue ),
                time : _timer.CurrentTime,
                minValue : minValue,
                maxValue : maxValue,
                period : period );
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

        #endregion


        #region Eating

        private void FoodCollidesCell( Food food )
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

        #endregion


        #region Utils

        private static Suit CalcRandomSuit()
        {
            return Random.Next( 2 ) == 0 ? Suit.Blue : Suit.Red;
        }

        private static double CalcRandomPeriod()
        {
            return Calc.Proportion( MinFoodPeriod, MaxFoodPeriod, Random.NextDouble() );
        }

        private static double CalcRandomMaxValue()
        {
            return Calc.Proportion( MinFoodValue, MaxFoodValue, Random.NextDouble() );
        }

        private static double CalcRandomMinValue( double maxValue )
        {
            return Calc.Proportion( MinFoodValue, maxValue, Random.NextDouble() );
        }

        private static double CalcFoodSize( Food food )
        {
            return CalcFoodSize( food.IValuable.Value );
        }

        private static double CalcFoodSize( double value )
        {
            var square = value/MaxFoodValue;
            var size = Math.Sqrt( square );
            return Calc.Proportion( MinFoodSize, MaxFoodSize, size );
        }

        private static double CalcFoodValue( Food food, DateTime currentTime )
        {
            var duration = currentTime - food.IFood.CreationTime;
            return Calc.Harmonics( 0, food.IFood.MaxValue, duration.TotalSeconds, 1/food.IFood.ValuePeriod );
        }

        private Point CalcRandomPosition()
        {
            return Point.RandomIn( _game.GetWorldBounds() );
        }

        #endregion
    }
}