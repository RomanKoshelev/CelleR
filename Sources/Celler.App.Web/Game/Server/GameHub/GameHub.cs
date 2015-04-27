// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameHub.cs

using System;
using Celler.App.Web.Game.Server.Models;
using Microsoft.AspNet.SignalR;
using NLog;

namespace Celler.App.Web.Game.Server.GameHub
{
    public class GameHub : Hub
    {
        const double RoomWidth = 720;
        const double RoomHeight = 720;

        public GameHub()
        {
        }

        public void HintSightPosition( SuitPointModel position )
        {
            KeepPositionInBounds( position );
            Clients.All.SightPositionHinted( position );
        }

        public void MoveCell( SuitPointModel position  )
        {
            KeepPositionInBounds( position );
            Clients.All.CellMoved( position );
        }
    
        public void MoveSight( SuitPointModel position  )
        {
            KeepPositionInBounds( position );
            Clients.All.SightMoved( position );
        }

        public string GetPlayerId()
        {
            return Context.ConnectionId;
        }
        public RoomModel GetRoomData()
        {
            return new RoomModel {
                Width = RoomWidth,
                Height = RoomHeight
            };
        }

        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private static void KeepPositionInBounds( SuitPointModel position )
        {
            position.Point.X = Math.Max( position.Point.X, 0 );
            position.Point.Y = Math.Max( position.Point.Y, 0 );
            position.Point.X = Math.Min( position.Point.X, RoomWidth );
            position.Point.Y = Math.Min( position.Point.Y, RoomHeight );
        }
    }
}