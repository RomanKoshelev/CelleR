// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameLogic.cs

using System;
using Celler.App.Web.Game.Server.App;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Managers;
using Celler.App.Web.Game.Server.Models;
using NLog;

namespace Celler.App.Web.Game.Server.Logic
{
    public class GameLogic : IGameLogic, IGameManager
    {
        #region Constructors

        public GameLogic()
        {
            _clients = GameApplication.Instance.GameClients;
            _sessionManager = new SessionManager();
            _collisionLogic = new CollisionLogic( this, _sessionManager );
            _foodLogic = new FoodLogic( this, _sessionManager );

            InitSessionManager();
        }

        #endregion


        #region Public methods

        public static int GetTickInterval()
        {
            return TickInterval;
        }

        #endregion


        #region IGameLogic

        void IGameLogic.MoveCell( string id, PointModel position )
        {
            KeepPositionInBounds( position );
            _sessionManager.MoveCell( id, position );
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
            _sessionManager.MoveSight( id, position );
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
            return _sessionManager.ToModel();
        }

        void IGameLogic.Update()
        {
            UpdateTime();
            
            _foodLogic.Update();
            _collisionLogic.Update();

            _clients.TickCountUpdated( _sessionManager.TickCount++ );
        }

        #endregion


        #region IGameManager

        TimeSpan IGameManager.TimeAfterLastUpdate { get; set; }
        DateTime IGameManager.LastTime { get; set; }
        DateTime IGameManager.CurrentTime { get; set; }

        IGameClient IGameManager.Clients
        {
            get { return _clients; }
        }

        Size IGameManager.GetBounds()
        {
            return new Size( WorldWidth, WorldHeight );
        }

        void IGameManager.Trace( string message, params object[] args )
        {
            Logger.Trace( message, args );
        }

        #endregion


        #region Private constants

        private const int TickInterval = 1000;
        private const double WorldWidth = 720;
        private const double WorldHeight = 720;
        private const double HomeSize = 150;
        private const double CellSize = 65;
        private const double SightSize = 100;

        #endregion


        #region Private fields

        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private readonly IGameClient _clients;
        private readonly SessionManager _sessionManager;
        private readonly FoodLogic _foodLogic;
        private CollisionLogic _collisionLogic;

        #endregion


        #region Private methods

        private void UpdateTime()
        {
            var m = this as IGameManager;
            m.TimeAfterLastUpdate = DateTime.Now - m.LastTime;
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