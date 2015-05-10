// Celler (c) 2015 Krokodev
// Celler.App.Web
// SessionManager.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Logic;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Managers
{
    public class SessionManager : Entity< SessionModel >, IFoodManager, IBodyManager, ICellManager, IHomeManager,
        ISightManager
    {
        #region Constructor

        public SessionManager( IGameClient clients )
        {
            _id = Guid.NewGuid().ToString();
            _cells = new List< Cell >();
            _homes = new List< Home >();
            _sights = new List< Sight >();
            _foods = new List< Food >();
            _clients = clients;
        }

        #endregion


        #region IEntity

        protected override SessionModel ToModel()
        {
            return new SessionModel {
                Id = _id,
                Cells = _cells.Select( o => o.IModelled.Model ).ToArray(),
                Homes = _homes.Select( o => o.IModelled.Model ).ToArray(),
                Sights = _sights.Select( o => o.IModelled.Model ).ToArray(),
                Foods = _foods.Select( o => o.IModelled.Model ).ToArray()
            };
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

        void ICellManager.MoveCell( string id, PointModel position )
        {
            _cells.First( c => c.IIdentifiable.Id == id ).IBody.Position = new Point( position );
            _clients.CellMoved( id, position );
        }

        #endregion


        #region IFoodManager

        public IFoodManager IFoodManager
        {
            get { return this; }
        }

        Food IFoodManager.AddFood( Suit suit, Point position, double size, DateTime time, double maxValue, double frequancy )
        {
            var food = new Food( suit, position, size, time, maxValue, frequancy);
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

            _clients.FoodsUpdated( _foods.Select( f=>f.IModelled.Model ).ToArray() );
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

        Home IHomeManager.AddHome( Suit suit, Point position, double size )
        {
            var obj = new Home( suit, position, size );
            _homes.Add( obj );
            return obj;
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
        private readonly List< Cell > _cells;
        private readonly List< Home > _homes;
        private readonly List< Sight > _sights;
        private readonly List< Food > _foods;
        private readonly IGameClient _clients;

        #endregion
    }
}