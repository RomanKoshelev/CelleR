// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameLogic.cs

using System;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Dispatcher;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Logic
{
    public class GameLogic : IGameLogic {

        private const double WorldWidth = 720;
        private const double WorldHeight = 720;
        private const int TickInterval = 1000;

        private readonly IGameClient _clients;
        private readonly Session _session;

        public GameLogic()
        {
            _clients = GameDispatcher.Instance.GameClients;
            _session = new Session();
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

        SizeModel IGameLogic.GetBounds()
        {
            return new SizeModel {
                Width = WorldWidth,
                Height = WorldHeight
            };
        }

        SessionModel IGameLogic.GetSession()
        {
            return _session.ToModel();
        }

        public void Update()
        {
            _clients.TickCountUpdated( _session.TickCount++);
        }

        private static void KeepPositionInBounds( SuitPointModel position )
        {
            position.Point.X = Math.Max( position.Point.X, 0 );
            position.Point.Y = Math.Max( position.Point.Y, 0 );
            position.Point.X = Math.Min( position.Point.X, WorldWidth );
            position.Point.Y = Math.Min( position.Point.Y, WorldHeight );
        }

        public static int GetTickInterval()
        {
            return TickInterval;
        }
    }
}