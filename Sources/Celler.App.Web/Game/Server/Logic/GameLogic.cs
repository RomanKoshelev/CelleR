// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameLogic.cs

using System;
using Celler.App.Web.Game.Server.App;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Logic
{
    public class GameLogic : IGameLogic
    {
        public GameLogic()
        {
            _clients = GameApplication.Instance.GameClients;
            InitSession();
        }

        public static int GetTickInterval()
        {
            return TickInterval;
        }


        #region IGameLogic

        void IGameLogic.MoveCell( string id, PointModel position )
        {
            KeepPositionInBounds( position );
            _session.MoveCell( id, position );
            _clients.CellMoved( id, position );
        }

        void IGameLogic.HintSightPosition( string id, PointModel position )
        {
            KeepPositionInBounds( position );
            _clients.SightPositionHinted( id, position );
        }

        void IGameLogic.MoveSight( string id, PointModel position )
        {
            KeepPositionInBounds( position );
            _session.MoveSight( id, position );
            _clients.SightMoved( id, position );
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
        private const double MinFoodSize = 20;

        private readonly IGameClient _clients;
        private Session _session;

        private void InitSession()
        {
            _session = new Session();
            InitSessionSuit( _session, Suit.Blue );
            InitSessionSuit( _session, Suit.Red );
        }

        private static void InitSessionSuit( Session session, Suit suit )
        {
            var place = GetCornerCoords( suit, HomeSize/2 );
            var home = session.AddHome( suit, place, HomeSize );
            var cell = session.AddCell( suit, place, CellSize );
            var sight = session.AddSight( suit, place, SightSize );
            var food = session.AddFood( suit, place, MinFoodSize );
            cell.HomeId = home.Id;
            cell.SightId = sight.Id;
            sight.CellId = cell.Id;
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