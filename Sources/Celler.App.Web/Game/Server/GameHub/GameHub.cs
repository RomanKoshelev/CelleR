// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameHub.cs

using Celler.App.Web.Game.Server.Models;
using Microsoft.AspNet.SignalR;
using NLog;

namespace Celler.App.Web.Game.Server.GameHub
{
    public class GameHub : Hub
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public GameHub()
        {
            Logger.Trace( "GameHub ctor" );
        }

        public void UpdateSightCoords( SightModel sight )
        {
            Logger.Trace( "UpdateSightCoords( {0} )", sight.Suit );
            Clients.All.SightCoordsUpdated( sight );
        }
    }
}