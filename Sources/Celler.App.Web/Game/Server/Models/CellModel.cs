// Celler (c) 2015 Krokodev
// Celler.App.Web
// CellModel.cs

namespace Celler.App.Web.Game.Server.Models
{
    public class CellModel
    {
        private string Id { get; set; }
        public string Suit { get; set; }
        public PointModel Position { get; set; }
    }
}