// Celler (c) 2015 Krokodev
// Celler.App.Web
// EntityTools.cs

using System;
using Celler.App.Web.Game.Server.Entities.Structs;

namespace Celler.App.Web.Game.Server.Utils
{
    public static class EntityToos
    {
        public static Point KeepPointInBounds(
            Point point,
            double left,
            double top,
            double right,
            double bottom )
        {
            var x = point.X;
            var y = point.Y;
            x = Math.Max( x, left );
            y = Math.Max( y, top );
            x = Math.Min( x, right );
            y = Math.Min( y, bottom );
            return new Point( x, y );
        }
    }
}