// Celler (c) 2015 Krokodev
// Celler.App.Web
// MainLogic.cs

using System;
using System.Collections.Generic;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Managers;
using Celler.App.Web.Game.Server.Models;
using Celler.App.Web.Game.Server.Utils;
using NLog;

namespace Celler.App.Web.Game.Server.Logic
{
    public class MainLogic : IGameLogic, ITimeLogic
    {
        #region Ctor

        public MainLogic( IGameClient clients )
        {
            Logger.Trace( "MainLogic" );

            _clients = clients;
            _sessionManager = new SessionManager( clients : _clients );

            CreateAuxLogics();
            InitSessionManager();
        }

        #endregion


        #region ITimeLogic

        DateTime ITimeLogic.LastTime { get; set; }

        int ITimeLogic.GetTickInterval()
        {
            return TickInterval;
        }

        DateTime ITimeLogic.CurrentTime { get; set; }

        #endregion


        #region IGameLogic

        void IGameLogic.MoveCell( string id, PointModel position )
        {
            _cellLogic.MoveCell( id, position );
        }

        void IGameLogic.HintSightPosition( string id, PointModel position )
        {
            ModelToos.KeepPointInBounds( position, 0, 0, WorldWidth, WorldHeight );
            _clients.SightPositionHinted( id, position );
        }

        void IGameLogic.MoveSight( string id, PointModel position )
        {
            ModelToos.KeepPointInBounds( position, 0, 0, WorldWidth, WorldHeight );
            _sessionManager.ISightManager.MoveSight( id, position );
        }

        SizeModel IGameLogic.GetBounds()
        {
            return new SizeModel {
                Width = WorldWidth,
                Height = WorldHeight
            };
        }

        SessionModel IGameLogic.GetSession()
        {
            return _sessionManager.IModelled.Model;
        }

        void IGameLogic.Update()
        {
            UpdateTime();
            _auxLlogics.ForEach( l => l.Update() );
            _clients.TickCountUpdated( _tickCount++ );
        }

        #endregion


        #region Constants

        private const int TickInterval = 2000;
        private const double WorldWidth = 720;
        private const double WorldHeight = 720;
        private const double HomeSize = 150;
        private const double HomeIniLoot = 1;
        private const double HomeMaxLoot = 10;
        private const double CellSize = 65;
        private const double SightSize = 100;

        #endregion


        #region Fields

        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private readonly IGameClient _clients;
        private readonly SessionManager _sessionManager;
        private ICellLogic _cellLogic;
        private readonly List< IAuxLogic > _auxLlogics = new List< IAuxLogic >();
        private int _tickCount;

        #endregion


        #region Utils

        private void CreateAuxLogics()
        {
            var collisionLogic = new CollisionLogic(
                bodyManager : _sessionManager );
            var foodLogic = new FoodLogic(
                game : this,
                timer : this,
                collider : collisionLogic,
                foodManager : _sessionManager );
            var homeLogic = new HomeLogic(
                homeManager : _sessionManager );
            _cellLogic = new CellLogic(
                game : this,
                homeLogic : homeLogic,
                collider: collisionLogic,
                cellManager : _sessionManager );

            _auxLlogics.Add( collisionLogic );
            _auxLlogics.Add( foodLogic );
            _auxLlogics.Add( homeLogic );
            _auxLlogics.Add( _cellLogic );
        }

        private void UpdateTime()
        {
            var m = this as ITimeLogic;
            m.LastTime = m.CurrentTime;
            m.CurrentTime = DateTime.Now;
        }

        private void InitSessionManager()
        {
            InitSessionSuit( _sessionManager, Suit.Blue );
            InitSessionSuit( _sessionManager, Suit.Red );
        }

        private static void InitSessionSuit( SessionManager sessionManager, Suit suit )
        {
            var place = GetCornerCoords( suit, HomeSize/2 );
            // Todo:> Use Logics to initiate Homes and Cells
            var home = sessionManager.IHomeManager.AddHome( suit, place, HomeSize, HomeIniLoot, HomeMaxLoot);
            var cell = sessionManager.ICellManager.AddCell( suit, place, CellSize );
            var sight = sessionManager.ISightManager.AddSight( suit, place, SightSize );
            cell.ICell.HomeId = home.IIdentifiable.Id;
            cell.ICell.SightId = sight.IIdentifiable.Id;
            sight.ISight.CellId = cell.IIdentifiable.Id;
        }

        private static Point GetCornerCoords( Suit suit, double margin )
        {
            switch( suit ) {
                case Suit.Blue :
                    return new Point( margin, WorldWidth - margin );
                case Suit.Red :
                    return new Point( WorldHeight - margin, margin );
            }
            return new Point();
        }

        #endregion
    }
}