using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Structs;

namespace Celler.App.Web.Game.Server.Managers
{
    public interface IHomeManager {
        Home AddHome( Suit suit, Point position, double size );
    }
}