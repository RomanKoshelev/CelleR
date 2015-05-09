// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameLogic.cs

using System;
using System.Collections.Generic;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Managers;
using Celler.App.Web.Game.Server.Models;
using NLog;

namespace Celler.App.Web.Game.Server.Logic
{
    public class GameLogic : IGameLogic, ITimeLogic
    {
        #region Ctor

        public GameLogic( IGameClient clients )
        {
            Logger.Trace( "GameLogic" );

            _clients = clients;
            _sessionManager = new SessionManager( clients : _clients );

            var collisionLogic = new CollisionLogic( bodyManager : _sessionManager );
            _auxLlogics.Add( collisionLogic );

            _auxLlogics.Add( new FoodLogic(
                game : this,
                timer : this,
                collider : collisionLogic,
                foodManager : _sessionManager ) );

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
            KeepPositionInBounds( position );
            _sessionManager.MoveCell( id, position );
        }

        void IGameLogic.HintSightPosition( string id, PointModel position )
        {
            KeepPositionInBounds( position );
            _clients.SightPositionHinted( id, position );
        }

        void IGameLogic.MoveSight( string id, PointModel position )
        {
            KeepPositionInBounds( position );
            _sessionManager.MoveSight( id, position );
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
            return _sessionManager.ToModel();
        }

        void IGameLogic.Update()
        {
            UpdateTime();
            _auxLlogics.ForEach( l => l.Update() );
            _clients.TickCountUpdated( _tickCount++ );
        }

        #endregion


        #region Constants

        private const int TickInterval = 1000;
        private const double WorldWidth = 720;
        private const double WorldHeight = 720;
        private const double HomeSize = 150;
        private const double CellSize = 65;
        private const double SightSize = 100;

        #endregion


        #region Fields

        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private readonly IGameClient _clients;
        private readonly SessionManager _sessionManager;
        private readonly List< IAuxLogic > _auxLlogics = new List< IAuxLogic >();
        private int _tickCount;

        #endregion


        #region Methods

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
            var home = sessionManager.AddHome( suit, place, HomeSize );
            var cell = sessionManager.AddCell( suit, place, CellSize );
            var sight = sessionManager.AddSight( suit, place, SightSize );
            cell.ICell.HomeId = home.IIdentifiable.Id;
            cell.ICell.SightId = sight.IIdentifiable.Id;
            sight.ISight.CellId = cell.IIdentifiable.Id;
        }

        private static void KeepPositionInBounds( PointModel position )
        {
            position.X = Math.Max( position.X, 0 );
            position.Y = Math.Max( position.Y, 0 );
            position.X = Math.Min( position.X, WorldWidth );
            position.Y = Math.Min( position.Y, WorldHeight );
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