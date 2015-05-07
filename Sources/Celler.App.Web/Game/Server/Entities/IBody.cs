namespace Celler.App.Web.Game.Server.Entities
{
    public interface IBody
    {
        string Id { get; }
        
        Point Position { get; }
        double Size { get; }
    }
}