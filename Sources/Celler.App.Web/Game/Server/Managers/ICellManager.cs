// Celler (c) 2015 Krokodev
// Celler.App.Web
// ICellManager.cs

using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Managers
{
    public interface ICellManager
    {
        void MoveCell( string id, Point position );
        Cell AddCell( Suit suit, Point position, double size );
    }
}