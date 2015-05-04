// Celler (c) 2015 Krokodev
// Celler.App.Web
// Session.cs

using System;
using System.Collections.Generic;
using System.Linq;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Session
    {
        public string Id { get; set; }
        public List< Cell > Cells { get; set; }
        public List< Home > Homes { get; set; }
        public List< Sight > Sights { get; set; }
        public int TickCount { get; set; }

        public SessionModel ToModel()
        {
            return new SessionModel {
                Id = Id,
                Cells = Cells.Select( o => o.ToModel() ).ToArray(),
                Homes = Homes.Select( o => o.ToModel() ).ToArray(),
                Sights = Sights.Select( o => o.ToModel() ).ToArray()
            };
        }

        public Session()
        {
            Id = Guid.NewGuid().ToString();
            Cells = new List< Cell >();
            Homes = new List< Home >();
            Sights = new List< Sight >();
        }

        public void AddCell( Suit suit, Point position, double size )
        {
            Cells.Add( new Cell {
                Suit = suit,
                Position = position.Clone(),
                Size = size
            } );
        }

        public void AddHome( Suit suit, Point position, double size )
        {
            Homes.Add( new Home {
                Suit = suit,
                Position = position.Clone(),
                Size = size
            } );
        }

        public void AddSight( Suit suit, Point position, double size )
        {
            Sights.Add( new Sight {
                Suit = suit,
                Position = position.Clone(),
                Size = size
            } );
        }
    }
}