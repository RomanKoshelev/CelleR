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
        public void CellMoved( string id, PointModel position )
        {
            Clients.All.CellMoved( id, position );
        }

        public void SightPositionHinted( string id, PointModel position )
        {
            Clients.All.SightPositionHinted( id, position );
        }

        public void SightMoved( string id, PointModel position )
        {
            Clients.All.SightMoved( id, position );
        }

        public void TickCountUpdated( int tickCount )
        {
            Clients.All.TickCountUpdated( tickCount );
        }

        public void FoodAdded( FoodModel foodModel )
        {
            Clients.All.FoodAdded( foodModel );
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