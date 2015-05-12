// Celler (c) 2015 Krokodev
// Celler.App.Web
// MainLogic.cs

using System;
using System.Collections.Generic;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Config;
using Celler.App.Web.Game.Server.Entities.Enums;
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
            _session = new SessionManager( timer: this, clients : _clients );

            CreateAuxLogics();
            InitSessionManager();
        }

        #endregion


        #region ITimeLogic

        DateTime ITimeLogic.LastTime { get; set; }

        int ITimeLogic.GetUpdateInterval()
        {
            return (int)(UpdateInterval*1000);
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
            _session.ISightManager.MoveSight( id, position );
        }

        SizeModel IGameLogic.GetWorldBounds()
        {
            return new SizeModel {
                Width = WorldWidth,
                Height = WorldHeight
            };
        }

        SessionModel IGameLogic.GetSession()
        {
            return _session.IModelled.Model;
        }

        void IGameLogic.ResetSession()
        {
            Logger.Trace( "ResetSession" );
            _session.ISession.Reset();
            InitSessionManager();
            _clients.SessionUpdated( _session.IModelled.Model );
        }

        void IGameLogic.Update()
        {
            UpdateTime();
            _auxLlogics.ForEach( l => l.Update() );
            _clients.TickCountUpdated( _tickCount++ );
        }

        #endregion


        #region Constants

        private const double UpdateInterval = Settings.Dynamic.Game.Update.Interval;
        private const double WorldWidth = Settings.World.Width;
        private const double WorldHeight = Settings.World.Height;
        private const double SightSize = Settings.World.Sight.Size;

        #endregion


        #region Fields

        private ICellLogic _cellLogic;
        private IHomeLogic _homeLogic;
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private readonly IGameClient _clients;
        private readonly SessionManager _session;
        private readonly List< IAuxLogic > _auxLlogics = new List< IAuxLogic >();
        private int _tickCount;

        #endregion


        #region Utils

        private void CreateAuxLogics()
        {
            var collisionLogic = new CollisionLogic(
                bodyManager : _session );
            var foodLogic = new FoodLogic(
                game : this,
                timer : this,
                collider : collisionLogic,
                foodManager : _session );
            _homeLogic = new HomeLogic(
                game : this,
                homeManager : _session );
            _cellLogic = new CellLogic(
                game : this,
                homeLogic : _homeLogic,
                collider : collisionLogic,
                cellManager : _session );

            _auxLlogics.Add( collisionLogic );
            _auxLlogics.Add( foodLogic );
            _auxLlogics.Add( _homeLogic );
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
            InitSessionSuit( _session, Suit.Blue );
            InitSessionSuit( _session, Suit.Red );
        }

        private void InitSessionSuit( SessionManager sessionManager, Suit suit )
        {
            var home = _homeLogic.AddHome( suit );
            var cell = _cellLogic.AddCell( suit, home.IBody.Position);

            var sight = sessionManager.ISightManager.AddSight( suit, cell.IBody.Position, SightSize );

            cell.ICell.HomeId = home.IIdentifiable.Id;
            cell.ICell.SightId = sight.IIdentifiable.Id;
            sight.ISight.CellId = cell.IIdentifiable.Id;
        }

        #endregion
    }
}