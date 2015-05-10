// Celler (c) 2015 Krokodev
// Celler.App.Web
// IModelled.cs

namespace Celler.App.Web.Game.Server.Entities.Interfaces
{
    public interface IModelled<out T>
    {
        T Model { get; }
    }
}