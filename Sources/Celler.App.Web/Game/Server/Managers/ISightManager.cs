using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Managers
{
    public interface ISightManager {
        void MoveSight( string id, PointModel position );
        Sight AddSight( Suit suit, Point position, double size );
    }
}