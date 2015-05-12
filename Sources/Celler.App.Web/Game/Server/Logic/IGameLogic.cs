// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameLogic.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Logic
{
    public interface IGameLogic
    {
        void MoveCell( string id, PointModel position );
        void MoveSight( string id, PointModel position );
        void HintSightPosition( string id, PointModel position );
        SizeModel GetWorldBounds();
        SessionModel GetSession();
        void ResetSession();
        void Update();
    }
}