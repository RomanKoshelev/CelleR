// Celler (c) 2015 Krokodev
// Celler.App.Web
// SessionManager.cs

using System;
using System.Collections.Generic;
using System.Linq;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Logic;
using Celler.App.Web.Game.Server.Models;
using MoreLinq;

namespace Celler.App.Web.Game.Server.Managers
{
    public class SessionManager : Entity< SessionModel >,
        IFoodManager, IBodyManager, ICellManager, IHomeManager, ISightManager, ISession
    {
        #region Constructor

        public SessionManager( ITimeLogic timer, IGameClient clients )
        {
            _id = Guid.NewGuid().ToString();
            _clients = clients;
            _timer = timer;
            DoReset();
        }

        #endregion


        #region ISession

        public ISession ISession
        {
            get { return this; }
        }

        void ISession.Reset()
        {
            DoReset();
        }

        #endregion


        #region ICellManager

        public ICellManager ICellManager
        {
            get { return this; }
        }

        Cell ICellManager.AddCell( Suit suit, Point position, double size )
        {
            var cell = new Cell( suit, position, size );
            _cells.Add( cell );
            return cell;
        }

        void ICellManager.MoveCell( string id, Point position )
        {
            // Todo:> Use Dictionary, use try-catch
            _cells.First( c => c.IIdentifiable.Id == id ).IBody.Position = position;
            _clients.CellMoved( id, position.Model );
        }

        #endregion


        #region IFoodManager

        public IFoodManager IFoodManager
        {
            get { return this; }
        }

        Food IFoodManager.AddFood(
            Suit suit,
            Point position,
            double size,
            DateTime time,
            double minValue,
            double maxValue,
            double period )
        {
            var food = new Food( suit, position, size, time, minValue, maxValue, period );
            _foods.Add( food );
            _clients.FoodAdded( food.IModelled.Model );
            return food;
        }

        void IFoodManager.RemoveFood( Food food )
        {
            _foods.RemoveAll( f => f.IIdentifiable.Id == food.IIdentifiable.Id );
            _clients.FoodRemoved( food.IIdentifiable.Id );
        }

        int IFoodManager.GetFoodCount()
        {
            return _foods.Count();
        }

        void IFoodManager.UpdateFoods( Action< Food > action )
        {
            _foods.ForEach( action );

            _clients.FoodsUpdated( _foods.Select( f => f.IModelled.Model ).ToArray() );
        }

        #endregion


        #region IBodyManager

        public IBodyManager IBodyManager
        {
            get { return this; }
        }

        IList< IBody > IBodyManager.GetBodies()
        {
            return _homes
                .Concat< IBody >( _cells )
                .Concat< IBody >( _foods )
                .ToList();
        }

        #endregion


        #region IHomeManager

        public IHomeManager IHomeManager
        {
            get { return this; }
        }

        Home IHomeManager.AddHome( Suit suit, Point position, double size, double value, double maxValue )
        {
            var obj = new Home( suit, position, size, value, maxValue );
            _homes.Add( obj );
            return obj;
        }

        public void UpdateHomes( Func< Home, bool > condition, Action< Home > modificator )
        {
            var updatedHomes = _homes.Where( condition ).ToArray();
            updatedHomes.ForEach( modificator );
            var homeModels = updatedHomes.Select( h => h.IModelled.Model ).ToArray();
            _clients.HomesUpdated( homeModels );
        }

        #endregion


        #region ISightManager

        public ISightManager ISightManager
        {
            get { return this; }
        }

        Sight ISightManager.AddSight( Suit suit, Point position, double size )
        {
            var obj = new Sight( suit, position, size );
            _sights.Add( obj );
            return obj;
        }

        void ISightManager.MoveSight( string id, PointModel position )
        {
            _sights.First( c => c.IIdentifiable.Id == id ).IBody.Position = new Point( position );
            _clients.SightMoved( id, position );
        }

        #endregion


        #region Fields

        private readonly string _id;
        private List< Cell > _cells;
        private List< Home > _homes;
        private List< Sight > _sights;
        private List< Food > _foods;
        private readonly IGameClient _clients;
        private readonly ITimeLogic _timer;

        #endregion


        #region Overrides

        protected override SessionModel ToModel()
        {
            return new SessionModel {
                Id = _id,
                UpdateInterval = _timer.GetUpdateInterval(),
                Cells = _cells.Select( o => o.IModelled.Model ).ToArray(),
                Homes = _homes.Select( o => o.IModelled.Model ).ToArray(),
                Sights = _sights.Select( o => o.IModelled.Model ).ToArray(),
                Foods = _foods.Select( o => o.IModelled.Model ).ToArray()
            };
        }

        #endregion


        #region Utils

        private void DoReset()
        {
            _cells = new List< Cell >();
            _homes = new List< Home >();
            _sights = new List< Sight >();
            _foods = new List< Food >();
        }

        #endregion
    }
}