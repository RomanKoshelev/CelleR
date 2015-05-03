// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameLogic.cs

using System;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Dispatcher;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Logic
{
    public class GameLogic : IGameLogic {

        private const double RoomWidth = 720;
        private const double RoomHeight = 720;
        private const int TickInterval = 1000;

        private readonly IGameClient _clients;

        public GameLogic()
        {
            _clients = GameDispatcher.Instance.GameClients;
        }

        void IGameLogic.MoveCell( SuitPointModel position )
        {
            KeepPositionInBounds( position );
            _clients.CellMoved( position );
        }

        void IGameLogic.HintSightPosition( SuitPointModel position )
        {
            KeepPositionInBounds( position );
            _clients.SightPositionHinted( position );
        }

        void IGameLogic.MoveSight( SuitPointModel position )
        {
            KeepPositionInBounds( position );
            _clients.SightMoved( position );
        }

        RoomModel IGameLogic.GetRoomData()
        {
            return new RoomModel {
                Width = RoomWidth,
                Height = RoomHeight
            };
        }

        void IGameLogic.UpdateTickCount( int tickCount )
        {
            _clients.TickCountUpdated( tickCount );
        }

        private static void KeepPositionInBounds( SuitPointModel position )
        {
            position.Point.X = Math.Max( position.Point.X, 0 );
            position.Point.Y = Math.Max( position.Point.Y, 0 );
            position.Point.X = Math.Min( position.Point.X, RoomWidth );
            position.Point.Y = Math.Min( position.Point.Y, RoomHeight );
        }

        public static int GetTickInterval()
        {
            return TickInterval;
        }
    }
}