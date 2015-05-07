// Celler (c) 2015 Krokodev
// Celler.App.Web
// SuitObject.cs

using System;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public abstract class SuitObject : IBody
    {
        public string Id { get; private set; }
        public Suit Suit { get; set; }
        public Point Position { get; set; }
        public double Size { get; set; }

        protected SuitObject()
        {
            Id = Guid.NewGuid().ToString();
        }

        protected SuitObjectModel ToModel()
        {
            return new SuitObjectModel {
                Id = Id,
                Suit = Suit.ToString(),
                Position = Position.ToModel(),
                Size = Size
            };
        }
    }
}