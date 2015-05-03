// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameHub.cs

using System;
using Celler.App.Web.Game.Server.Dispatcher;
using Celler.App.Web.Game.Server.Logic;
using Celler.App.Web.Game.Server.Models;
using NLog;

namespace Celler.App.Web.Game.Server.Hub
{
    public class GameHub : Microsoft.AspNet.SignalR.Hub
    {
        private readonly IGameLogic _gameLogic;

        public GameHub()
        {
            _gameLogic = GameDispatcher.Instance.GameLogic;
        }

        public void HintSightPosition( SuitPointModel position )
        {
            //Clients.All.SightPositionHinted( position );
            _gameLogic.HintSightPosition( position );
        }

        public void MoveCell( SuitPointModel position )
        {
            _gameLogic.MoveCell( position );
        }

        public void MoveSight( SuitPointModel position )
        {
            _gameLogic.MoveSight( position );
        }

        public string GetPlayerId()
        {
            return Context.ConnectionId;
        }

        public RoomModel GetRoomData()
        {
            return _gameLogic.GetRoomData();
        }

    }
}