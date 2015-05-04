// Celler (c) 2015 Krokodev
// Celler.App.Web
// SessionModel.cs

namespace Celler.App.Web.Game.Server.Models
{
    public class SessionModel
    {
        public string Id { get; set; }
        public CellModel[] Cells { get; set; }
    }
}