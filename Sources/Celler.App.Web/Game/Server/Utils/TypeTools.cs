// Celler (c) 2015 Krokodev
// Celler.App.Web
// TypeTools.cs

using System.Linq;

namespace Celler.App.Web.Game.Server.Utils
{
    internal static class TypeTools
    {
        public static T WhoIs<T>( params object[] objects ) where T : class
        {
            return objects.OfType< T >().FirstOrDefault();
        }

        public static T WhoElseIs<T>( T first, params object[] objects ) where T : class
        {
            return objects.OfType< T >().FirstOrDefault(o => o!=first);
        }
    }
}