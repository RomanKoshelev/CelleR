// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameDispatcher.cs

using System;
using System.Threading;
using System.Web.Hosting;
using Celler.App.Web.Game.Server.Clients;
using Celler.App.Web.Game.Server.Logic;
using NLog;

namespace Celler.App.Web.Game.Server.Dispatcher
{
    public class GameDispatcher : IRegisteredObject
    {
        public event Action< int > OnTick = count => { };
        public event Action OnStop = () => { };

        public static GameDispatcher Instance
        {
            get { return _instance; }
            set
            {
                if( _instance != null ) {
                    throw new Exception( "GameDispatcher already hase instance" );
                }
                _instance = value;
            }
        }

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
            get { return _gameClients ?? ( _gameClients= new GameClientsProxy()); }
        }

        private IGameLogic _gameLogic;
        private IGameClient _gameClients;
        private Timer _tickTimer;
        private int _tickCount;
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private static GameDispatcher _instance;

        private void CreateTickTimer()
        {
            _tickTimer = new Timer( BroadcastUptimeToClients, null, 0, 1000 );
        }

        private void BroadcastUptimeToClients( object state )
        {
            OnTick( _tickCount++ );
        }

        public void Stop( bool immediate )
        {
            Logger.Trace( "GameDispatcher.Stop()" );
            OnStop();
        }
    }
}