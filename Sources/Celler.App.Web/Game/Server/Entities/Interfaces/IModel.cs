// Celler (c) 2015 Krokodev
// Celler.App.Web
// IModel.cs

namespace Celler.App.Web.Game.Server.Entities.Interfaces
{
    public interface IModel<out T>
    {
        T ToModel();
    }
}