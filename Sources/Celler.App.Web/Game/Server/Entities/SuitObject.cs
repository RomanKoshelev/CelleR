// Celler (c) 2015 Krokodev
// Celler.App.Web
// SuitObject.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public abstract class SuitObject
    {
        public string Id { get; set; }
        public Suit Suit { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }

        public SuitObjectModel ToModel()
        {
            return new SuitObjectModel {
                Id = Id,
                Suit = Suit.ToString(),
                Position = new PointModel { X = X, Y = Y },
                Size = new SizeModel { Width = Width, Height = Height }
            };
        }
    }
}