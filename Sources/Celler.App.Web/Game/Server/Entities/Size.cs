// Celler (c) 2015 Krokodev
// Celler.App.Web
// Size.cs

namespace Celler.App.Web.Game.Server.Entities
{
    public struct Size
    {
        public Size( double w, double h )
        {
            Width = w;
            Height = h;
        }

        public double Width;
        public double Height;
    }
}