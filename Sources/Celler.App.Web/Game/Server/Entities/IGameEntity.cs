// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameEntity.cs

namespace Celler.App.Web.Game.Server.Entities
{
    public interface IGameEntity<out TModel>
    {
        string Id { get; set; }
        TModel ToModel();
    }
}