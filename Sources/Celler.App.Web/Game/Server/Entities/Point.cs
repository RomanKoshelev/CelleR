// Celler (c) 2015 Krokodev
// Celler.App.Web
// Point.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities
{
    public class Point
    {
        public Point() {}

        public Point( double x, double y )
        {
            X = x;
            Y = y;
        }

        public double X { get; set; }
        public double Y { get; set; }


        public Point Clone()
        {
            return new Point(X,Y);
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
    }
}