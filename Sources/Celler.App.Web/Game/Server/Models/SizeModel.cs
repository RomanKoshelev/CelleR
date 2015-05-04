// Celler (c) 2015 Krokodev
// Celler.App.Web
// SizeModel.cs

using System.Diagnostics.CodeAnalysis;

namespace Celler.App.Web.Game.Server.Models
{
    [SuppressMessage( "ReSharper", "UnusedAutoPropertyAccessor.Global" )]
    public class SizeModel
    {
        public double Width { get; set; }
        public double Height { get; set; }
    }
}