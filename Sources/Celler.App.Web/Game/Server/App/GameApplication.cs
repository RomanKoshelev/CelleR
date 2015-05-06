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
        public static GameApplication Instance { get; set; }

        public GameApplication()
        {
            Logger.Trace( "new GameApplication" );
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
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        private void CreateTickTimer()
        {
            _tickTimer = new Timer( onTickTimer, null, 0, Logic.GameLogic.GetTickInterval() );
        }

        private void onTickTimer( object _ )
        {
            GameLogic.Update();
        }

        public void Stop( bool immediate )
        {
            _tickTimer.Dispose();
        }
    }
}