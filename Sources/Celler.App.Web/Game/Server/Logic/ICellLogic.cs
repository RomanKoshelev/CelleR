// Celler (c) 2015 Krokodev
// Celler.App.Web
// ICellLogic.cs

using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Structs;

namespace Celler.App.Web.Game.Server.Logic
{
    internal interface ICellLogic : IAuxLogic
    {
        void MoveCell( string id, Point position );
        Cell AddCell( Suit suit, Point position );
    }
}