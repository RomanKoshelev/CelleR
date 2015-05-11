// Celler (c) 2015 Krokodev
// Celler.App.Web
// CellLogic.cs

using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.GameObjects;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Managers;
using Celler.App.Web.Game.Server.Models;
using Celler.App.Web.Game.Server.Utils;

namespace Celler.App.Web.Game.Server.Logic
{
    internal class CellLogic : ICellLogic
    {
        #region Ctor

        public CellLogic( IGameLogic game, IHomeLogic homeLogic, ICollisionLogic collider, ICellManager cellManager )
        {
            _game = game;
            _homeLogic = homeLogic;
            _cellManager = cellManager;
            collider.onCollision += onCollision;
        }

        private void onCollision( IBody a, IBody b )
        {
            var cell = TypeTools.WhoIs< Cell >( a, b );
            var food = TypeTools.WhoIs< Food >( a, b );
            var cell2 = TypeTools.WhoElseIs< Cell >( cell, a, b );

            if( cell != null && food != null ) {
                procCellFoodCollision( cell, food );
            }
            if( cell != null && cell2 != null ) {
                procCellCellCollision( cell, cell2 );
            }
        }

        #endregion


        #region IAuxLogic

        void IAuxLogic.Update()
        {
            // Do nothing
        }

        #endregion


        #region ICellLogic

        void ICellLogic.MoveCell( string id, PointModel position )
        {
            var bounds = _game.GetBounds();
            ModelToos.KeepPointInBounds( position, 0, 0, bounds.Width, bounds.Height );
            _cellManager.MoveCell( id, position );
        }

        #endregion


        #region Fields

        private readonly ICellManager _cellManager;
        private readonly IGameLogic _game;
        private readonly IHomeLogic _homeLogic;

        #endregion


        #region Collision procedures

        private void procCellCellCollision( Cell cell, Cell cell2 )
        {
            // Todo:> Cell cell collision 
        }

        private void procCellFoodCollision( Cell cell, Food food )
        {
            var cellSuit = cell.ISuitable.Suit;
            var loot = GetLootValue( cellSuit, food );
            _homeLogic.ReceiveLoot( cellSuit, loot );
        }

        private static double GetLootValue( Suit suit, Food food )
        {
            return food.IValuable.Value*( food.ISuitable.Suit == suit ? 1 : -1 );
        }

        #endregion
    }
}