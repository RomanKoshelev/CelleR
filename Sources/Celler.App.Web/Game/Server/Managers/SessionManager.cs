// Celler (c) 2015 Krokodev
// Celler.App.Web
// SessionManager.cs

using System;
using System.Collections.Generic;
using System.Linq;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Managers
{
    public class SessionManager : IFoodManager, IBodyManager
    {
        #region Constructor

        public SessionManager( IGameClient clients )
        {
            Id = Guid.NewGuid().ToString();
            Cells = new List< Cell >();
            Homes = new List< Home >();
            Sights = new List< Sight >();
            Foods = new List< Food >();
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
            Cells.Add( obj );
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
            Foods.Add( food );
            _clients.FoodAdded( food.ToModel() );
            return food;
        }

        void IFoodManager.RemoveFood( Food food )
        {
            Foods.RemoveAll( f => f.Id == food.Id );
        }

        #endregion


        #region IBodyManager

        IList< IBody > IBodyManager.GetBodies()
        {
            return Homes
                .Concat< IBody >( Cells )
                .Concat< IBody >( Foods )
                .ToList();
        }

        #endregion


        #region Public Methods

        public SessionModel ToModel()
        {
            return new SessionModel {
                Id = Id,
                Cells = Cells.Select( o => o.ToModel() ).ToArray(),
                Homes = Homes.Select( o => o.ToModel() ).ToArray(),
                Sights = Sights.Select( o => o.ToModel() ).ToArray(),
                Foods = Foods.Select( o => o.ToModel() ).ToArray()
            };
        }

        public Home AddHome( Suit suit, Point position, double size )
        {
            var obj = new Home {
                Suit = suit,
                Position = position,
                Size = size
            };
            Homes.Add( obj );
            return obj;
        }

        public Sight AddSight( Suit suit, Point position, double size )
        {
            var obj = new Sight {
                Suit = suit,
                Position = position,
                Size = size
            };
            Sights.Add( obj );
            return obj;
        }

        public void MoveCell( string id, PointModel position )
        {
            Cells.First( c => c.Id == id ).Position = new Point( position );
            _clients.CellMoved( id, position );
        }

        public void MoveSight( string id, PointModel position )
        {
            Sights.First( c => c.Id == id ).Position = new Point( position );            
            _clients.SightMoved( id, position );
        }

        #endregion


        #region Private Properties

        private string Id { get; set; }
        private List< Cell > Cells { get; set; }
        private List< Home > Homes { get; set; }
        private List< Sight > Sights { get; set; }
        private List< Food > Foods { get; set; }
        private readonly IGameClient _clients;

        #endregion
    }
}