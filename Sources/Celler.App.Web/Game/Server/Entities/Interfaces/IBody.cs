using Celler.App.Web.Game.Server.Entities.Structs;

namespace Celler.App.Web.Game.Server.Entities.Interfaces
{
    public interface IBody
    {
        string Id { get; }
        Point Position { get; set; }
        double Size { get; set; }
    }
}