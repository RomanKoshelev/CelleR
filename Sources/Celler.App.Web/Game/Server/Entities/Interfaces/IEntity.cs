// Celler (c) 2015 Krokodev
// Celler.App.Web
// IEntity.cs

namespace Celler.App.Web.Game.Server.Entities.Interfaces
{
    public interface IEntity<out TModel> : IModel< TModel >
    {
        string Id { get; set; }
    }
}