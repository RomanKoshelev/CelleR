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
        }

        public void HintSightPosition( SuitPointModel position )
        {
            Clients.All.SightPositionHinted( position );
        }

        public void MoveCell( SuitPointModel position  )
        {
            Clients.All.CellMoved( position );
        }
    
        public void MoveSight( SuitPointModel position  )
        {
            Clients.All.SightMoved( position );
        }

        public string GetPlayerId()
        {
            return Context.ConnectionId;
        }
    }
}