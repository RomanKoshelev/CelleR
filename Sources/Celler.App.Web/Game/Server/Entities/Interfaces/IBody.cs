// Celler (c) 2015 Krokodev
// Celler.App.Web
// IBody.cs

using Celler.App.Web.Game.Server.Entities.Structs;

namespace Celler.App.Web.Game.Server.Entities.Interfaces
{
    public interface IBody
    {
        Point Position { get; set; }
        double Size { get; set; }
    }
}