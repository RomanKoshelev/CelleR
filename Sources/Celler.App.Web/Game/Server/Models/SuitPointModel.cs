// Celler (c) 2015 Krokodev
// Celler.App.Web
// SuitPointModel.cs

using System.Diagnostics.CodeAnalysis;

namespace Celler.App.Web.Game.Server.Models
{
    [SuppressMessage( "ReSharper", "UnusedAutoPropertyAccessor.Global" )]
    public class SuitPointModel
    {
        public string Suit { get; set; }
        public PointModel Point { get; set; }
    }
}