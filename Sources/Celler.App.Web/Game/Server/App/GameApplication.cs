// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameApplication.cs

using System.Threading;
using System.Web.Hosting;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Logic;
using NLog;

namespace Celler.App.Web.Game.Server.App
{
    public class GameApplication : IRegisteredObject
    {
        #region Ctor

        public static GameApplication Instance { get; set; }

        public GameApplication()
        {
            Logger.Trace( "new GameApplication" );
            Instance = this;
            CreateTickTimer();
        }

        #endregion


        #region IRegisteredObject

        void IRegisteredObject.Stop( bool immediate )
        {
            _tickTimer.Dispose();
        }

        #endregion


        #region Public properties

        public IGameLogic GameLogic
        {
            // Todo:> Use Unity to fabricate IGameLogic
            get { return _gameLogic ?? ( _gameLogic = new MainLogic( GameClients ) ); }
        }

        #endregion


        #region Private properties

        private IGameLogic _gameLogic;

        private IGameClient GameClients
        {
            get { return _gameClients ?? ( _gameClients = new GameClientsProxy() ); }
        }

        private IGameClient _gameClients;
        private Timer _tickTimer;

        private ITimeLogic TimeLogic
        {
            get { return ( ITimeLogic ) GameLogic; }
        }

        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        #endregion


        #region Private methods

        private void CreateTickTimer()
        {
            _tickTimer = new Timer( onTickTimer, null, 0, ( TimeLogic.GetTickInterval() ) );
        }

        private void onTickTimer( object _ )
        {
            GameLogic.Update();
        }

        #endregion
    }
}