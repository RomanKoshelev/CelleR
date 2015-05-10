// Celler (c) 2015 Krokodev
// Celler.App.Web
// Calc.cs

using System;

namespace Celler.App.Web.Game.Server.Utils
{
    public static class Calc
    {
        public static double Proportion( double min, double max, double rate )
        {
            return min + ( max - min )*rate;
        }

        public static double Harmonics( double min, double max, double time, double frequency )
        {
            var f = frequency*2*Math.PI;

            var sin = Math.Sin( time*f );

            return Proportion( min, max, ( sin + 1 )/2 );
        }
    }
}