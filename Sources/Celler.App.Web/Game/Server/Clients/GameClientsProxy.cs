// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameClientsProxy.cs

using Celler.App.Web.Game.Server.Hub;
using Celler.App.Web.Game.Server.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Celler.App.Web.Game.Server.Clients
{
    public class GameClientsProxy : IGameClient
    {
        public void CellMoved( SuitPointModel position )
        {
            Clients.All.CellMoved( position );
        }

        public void SightPositionHinted( SuitPointModel position )
        {
            Clients.All.SightPositionHinted( position );
        }

        public void SightMoved( SuitPointModel position )
        {
            Clients.All.SightMoved( position );
        }

        private static IHubConnectionContext< dynamic > Clients
        {
            get { return Context.Clients; }
        }

        private static IHubContext Context
        {
            get { return GlobalHost.ConnectionManager.GetHubContext< GameHub >(); }
        }
    }
}