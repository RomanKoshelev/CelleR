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
        public int TickCount { get; set; }

        public SessionModel ToModel()
        {
            return new SessionModel {
                Id = Id,
                Cells = Cells.Select( cell => cell.ToModel() ).ToArray()
            };
        }

        public Session()
        {
            Id = Guid.NewGuid().ToString();
            CreateObjects();
        }

        private void CreateObjects()
        {
            Cells = new List< Cell > {
                new Cell {
                    Suit = Suit.Blue,
                    Position = new Point( 50, 650 ),
                    Size = 50,
                },
                new Cell {
                    Suit = Suit.Red,
                    Position = new Point( 650, 50 ),
                    Size = 30,
                }
            };
        }
    }
}