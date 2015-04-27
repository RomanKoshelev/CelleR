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

        public void HintSightPosition( SuitPositonModel position )
        {
            Clients.All.SightPositionHinted( position );
        }

        public void MoveCell( SuitPositonModel position  )
        {
            Clients.All.CellMoved( position );
        }
    
        public void MoveSight( SuitPositonModel position  )
        {
            Clients.All.SightMoved( position );
        }
    }
}