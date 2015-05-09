// Celler (c) 2015 Krokodev
// Celler.App.Web
// SessionManager.cs

using System;
using System.Collections.Generic;
using System.Linq;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Managers
{
    public class SessionManager : Entity< SessionModel >, IFoodManager, IBodyManager
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


        #region ICellManager

        public Cell AddCell( Suit suit, Point position, double size )
        {
            var obj = new Cell {
                Suit = suit,
                Position = position,
                Size = size
            };
            _cells.Add( obj );
            return obj;
        }

        #endregion


        #region IFoodManager

        Food IFoodManager.AddFood( Suit suit, Point position, double size )
        {
            var food = new Food {
                Suit = suit,
                Position = position,
                Size = size
            };
            _foods.Add( food );
            _clients.FoodAdded( food.IModelled.Model );
            return food;
        }

        void IFoodManager.RemoveFood( Food food )
        {
            _foods.RemoveAll( f => f.IIdentifiable.Id == food.IIdentifiable.Id );
            _clients.FoodRemoved( food.IIdentifiable.Id );
        }

        #endregion


        #region IBodyManager

        IList< IBody > IBodyManager.GetBodies()
        {
            return _homes
                .Concat< IBody >( _cells )
                .Concat< IBody >( _foods )
                .ToList();
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


        #region Public

        public Home AddHome( Suit suit, Point position, double size )
        {
            var obj = new Home {
                Suit = suit,
                Position = position,
                Size = size
            };
            _homes.Add( obj );
            return obj;
        }

        public Sight AddSight( Suit suit, Point position, double size )
        {
            var obj = new Sight {
                Suit = suit,
                Position = position,
                Size = size
            };
            _sights.Add( obj );
            return obj;
        }

        public void MoveCell( string id, PointModel position )
        {
            _cells.First( c => c.IIdentifiable.Id == id ).Position = new Point( position );
            _clients.CellMoved( id, position );
        }

        public void MoveSight( string id, PointModel position )
        {
            _sights.First( c => c.IIdentifiable.Id == id ).Position = new Point( position );
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