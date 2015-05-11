using System;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Utils
{
    public static class ModelToos
    {
        public static void KeepPointInBounds(
            PointModel point,
            double left,
            double top,
            double right,
            double bottom )
        {
            point.X = Math.Max( point.X, left );
            point.Y = Math.Max( point.Y, top );
            point.X = Math.Min( point.X, right );
            point.Y = Math.Min( point.Y, bottom );
        }
    }
}