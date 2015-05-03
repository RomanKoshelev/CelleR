// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameDispatcher.cs

using System.Threading;
using System.Web.Hosting;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Logic;
using NLog;

namespace Celler.App.Web.Game.Server.Dispatcher
{
    public class GameDispatcher : IRegisteredObject
    {
        public static GameDispatcher Instance { get; set; }

        public GameDispatcher()
        {
            Logger.Trace( "new GameDispatcher" );
            Instance = this;
            CreateTickTimer();
        }

        public IGameLogic GameLogic
        {
            get { return _gameLogic ?? ( _gameLogic = new GameLogic() ); }
        }

        public IGameClient GameClients
        {
            get { return _gameClients ?? ( _gameClients = new GameClientsProxy() ); }
        }

        private IGameLogic _gameLogic;
        private IGameClient _gameClients;
        private Timer _tickTimer;
        private int _tickCount;
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        private void CreateTickTimer()
        {
            _tickCount = 0;
            _tickTimer = new Timer( onTickTimer, null, 0, Logic.GameLogic.GetTickInterval() );
        }

        private void onTickTimer( object _ )
        {
            GameLogic.UpdateTickCount( _tickCount++ );
        }

        public void Stop( bool immediate )
        {
            _tickTimer.Dispose();
        }
    }
}