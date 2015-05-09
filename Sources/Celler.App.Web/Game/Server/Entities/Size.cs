// Celler (c) 2015 Krokodev
// Celler.App.Web
// Size.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public struct Size
    {
        public readonly double Width;
        public readonly double Height;

        public Size( double w, double h )
        {
            Width = w;
            Height = h;
        }

        public static implicit operator Size( SizeModel m )
        {
            return new Size( m );
        }

        public Size( SizeModel s )
        {
            Width = s.Width;
            Height = s.Height;
        }
    }
}