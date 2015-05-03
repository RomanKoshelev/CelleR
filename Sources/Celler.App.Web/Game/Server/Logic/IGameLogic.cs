// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameLogic.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Logic
{
    public interface IGameLogic
    {
        void MoveCell( SuitPointModel position );
        void HintSightPosition( SuitPointModel position );
        void MoveSight( SuitPointModel position );
        RoomModel GetRoomData();
    }
}