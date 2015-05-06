// Celler (c) 2015 Krokodev
// Celler.App.Web
// Point.cs

using System;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public struct Point
    {
        public Point( double x, double y )
        {
            X = x;
            Y = y;
        }

        public double X;
        public double Y;

        public Point Clone()
        {
            return new Point( X, Y );
        }

        public PointModel ToModel()
        {
            return new PointModel { X = X, Y = Y };
        }

        public void FromModel( PointModel p )
        {
            X = p.X;
            Y = p.Y;
        }

        private static readonly Random Random = new Random( ( int ) DateTime.Now.Ticks & 0x0000FFFF );

        public static Point RandomIn( Size box )
        {
            return new Point {
                X = box.Width*Random.NextDouble(),
                Y = box.Height*Random.NextDouble()
            };
        }
    }
}