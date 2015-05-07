// Celler (c) 2015 Krokodev
// Celler.App.Web
// Point.cs

using System;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public struct Point
    {
        public double X;
        public double Y;

        public Point( double x, double y )
        {
            X = x;
            Y = y;
        }

        public Point( PointModel point )
        {
            X = point.X;
            Y = point.Y;
        }

        public PointModel ToModel()
        {
            return new PointModel { X = X, Y = Y };
        }

        private static readonly Random Random = new Random( ( int ) DateTime.Now.Ticks & 0x0000FFFF );

        public static Point RandomIn( Size box )
        {
            return new Point {
                X = box.Width*Random.NextDouble(),
                Y = box.Height*Random.NextDouble()
            };
        }

        public static double Distance( Point a, Point b )
        {
            return Math.Sqrt( ( a.X - b.X )*( a.X - b.X ) + ( a.Y - b.Y )*( a.Y - b.Y ) );
        }
    }
}