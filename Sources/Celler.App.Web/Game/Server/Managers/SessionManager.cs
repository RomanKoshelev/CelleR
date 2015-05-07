// Celler (c) 2015 Krokodev
// Celler.App.Web
// SessionManager.cs

using System;
using System.Collections.Generic;
using System.Linq;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Managers
{
    public class SessionManager : IFoodManager, IBodyManager
    {
        public string Id { get; set; }
        public List< Cell > Cells { get; set; }
        public List< Home > Homes { get; set; }
        public List< Sight > Sights { get; set; }
        public List< Food > Foods { get; set; }
        public int TickCount { get; set; }

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

        public SessionManager()
        {
            Id = Guid.NewGuid().ToString();
            Cells = new List< Cell >();
            Homes = new List< Home >();
            Sights = new List< Sight >();
            Foods = new List< Food >();
        }

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

        public Food AddFood( Suit suit, Point position, double size )
        {
            var obj = new Food {
                Suit = suit,
                Position = position,
                Size = size
            };
            Foods.Add( obj );
            return obj;
        }

        public void MoveCell( string id, PointModel position )
        {
            Cells.First( c => c.Id == id ).Position = new Point( position );
        }

        public void MoveSight( string id, PointModel position )
        {
            Sights.First( c => c.Id == id ).Position = new Point( position );
        }

        IList< IBody > IBodyManager.GetBodies()
        {
            return Homes
                .Concat< IBody >( Cells )
                .Concat< IBody >( Foods )
                .ToList();
        }
    }
}