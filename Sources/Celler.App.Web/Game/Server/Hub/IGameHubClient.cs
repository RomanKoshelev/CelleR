// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameHubClient.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Hub
{
    public interface IGameHubClient
    {
        void SightPositionHinted( string id, PointModel position );
        void CellMoved( string id, PointModel position );
        void SightMoved( string id, PointModel position );
        void TickCountUpdated( int tickCount );
    }
}