// Celler (c) 2015 Krokodev
// Celler.App.Web
// Point.cs

using System;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.Structs
{
    public struct Point: IModel<PointModel>
    {
        public readonly double X;
        public readonly double Y;

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

        public static implicit operator Point( PointModel m )
        {
            return new Point( m );
        }

        private static readonly Random Random = new Random( ( int ) DateTime.Now.Ticks & 0x0000FFFF );

        public static Point RandomIn( Size box )
        {
            return new Point( box.Width*Random.NextDouble(), box.Height*Random.NextDouble() );
        }

        public static double Distance( Point a, Point b )
        {
            return Math.Sqrt( ( a.X - b.X )*( a.X - b.X ) + ( a.Y - b.Y )*( a.Y - b.Y ) );
        }
    }
}