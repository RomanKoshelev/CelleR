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
        #region IGameHubClient

        void IGameHubClient.CellMoved( string id, PointModel position )
        {
            Clients.All.CellMoved( id, position );
        }

        void IGameHubClient.SightPositionHinted( string id, PointModel position )
        {
            Clients.All.SightPositionHinted( id, position );
        }

        void IGameHubClient.SightMoved( string id, PointModel position )
        {
            Clients.All.SightMoved( id, position );
        }

        void IGameHubClient.TickCountUpdated( int tickCount )
        {
            Clients.All.TickCountUpdated( tickCount );
        }

        void IGameHubClient.FoodAdded( FoodModel foodModel )
        {
            Clients.All.FoodAdded( foodModel );
        }

        void IGameHubClient.FoodRemoved( string id )
        {
            Clients.All.FoodRemoved( id );
        }

        void IGameHubClient.FoodsUpdated( FoodModel[] models )
        {
            Clients.All.FoodsUpdated( models );
        }

        public void HomesUpdated( HomeModel[] models )
        {
            Clients.All.HomesUpdated( models );
        }

        #endregion


        #region Static

        private static IHubConnectionContext< dynamic > Clients
        {
            get { return Context.Clients; }
        }

        private static IHubContext Context
        {
            get { return GlobalHost.ConnectionManager.GetHubContext< GameHub >(); }
        }

        #endregion
    }
}