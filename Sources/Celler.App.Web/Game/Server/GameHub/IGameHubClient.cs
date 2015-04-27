// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameHubClient.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.GameHub
{
    public interface IGameHubClient
    {
        void SightCoordsUpdated( SightModel sight );
    }
}