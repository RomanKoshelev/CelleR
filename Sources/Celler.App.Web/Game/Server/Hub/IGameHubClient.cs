// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameHubClient.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Hub
{
    public interface IGameHubClient
    {
        void SightPositionHinted( SuitPointModel position );
        void CellMoved( SuitPointModel position );
        void SightMoved( SuitPointModel position );
    }
}