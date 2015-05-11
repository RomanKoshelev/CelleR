// Celler (c) 2015 Krokodev
// Celler.App.Web
// ICellLogic.cs

using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Logic
{
    internal interface ICellLogic : IAuxLogic {
        void MoveCell( string id, PointModel position );
    }
}