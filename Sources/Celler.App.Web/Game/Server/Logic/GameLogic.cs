// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameLogic.cs

using System;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Dispatcher;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Logic
{
    public class GameLogic : IGameLogic
    {
        public GameLogic()
        {
            _clients = GameDispatcher.Instance.GameClients;
            InitSession();
        }

        public static int GetTickInterval()
        {
            return TickInterval;
        }


        #region IGameLogic

        void IGameLogic.MoveCell( SuitPointModel position )
        {
            KeepPositionInBounds( position );
            _clients.CellMoved( position );
        }

        void IGameLogic.HintSightPosition( SuitPointModel position )
        {
            KeepPositionInBounds( position );
            _clients.SightPositionHinted( position );
        }

        void IGameLogic.MoveSight( SuitPointModel position )
        {
            KeepPositionInBounds( position );
            _clients.SightMoved( position );
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
            return _session.ToModel();
        }

        void IGameLogic.Update()
        {
            _clients.TickCountUpdated( _session.TickCount++ );
        }

        #endregion


        #region Private

        private const int TickInterval = 1000;
        private const double WorldWidth = 720;
        private const double WorldHeight = 720;
        private const double HomeSize = 150;
        private const double CellSize = 65;
        private const double SightSize = 100;

        private readonly IGameClient _clients;
        private Session _session;

        private void InitSession()
        {
            _session = new Session();
            InitSessionSuit( _session, Suit.Blue );
            InitSessionSuit( _session, Suit.Red );
        }

        private void InitSessionSuit( Session session, Suit suit )
        {
            var corner = GetCornerCoords( suit, HomeSize/2 );
            session.AddHome( suit, corner, HomeSize );
            session.AddCell( suit, corner, CellSize );
            session.AddSight( suit, corner, CellSize );
        }

        private static void KeepPositionInBounds( SuitPointModel position )
        {
            position.Point.X = Math.Max( position.Point.X, 0 );
            position.Point.Y = Math.Max( position.Point.Y, 0 );
            position.Point.X = Math.Min( position.Point.X, WorldWidth );
            position.Point.Y = Math.Min( position.Point.Y, WorldHeight );
        }

        private Point GetCornerCoords( Suit suit, double margin )
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