// Crimenuts (c) 2015 Crocodev
// Research.Signalr.Typescript
// ChatHub.pvt.Users.cs

using System.Threading.Tasks;

namespace Research.Signalr.Typescript.Hubs
{
    public partial class ChatHub
    {
        private string _connectionId = "";

        public override Task OnConnected()
        {
            _connectionId = Context.ConnectionId;
            Logger.Trace( string.Format( "OnConnected [{0}]", Context.ConnectionId ) );

            return base.OnConnected();
        }

        public override Task OnDisconnected( bool stopCalled )
        {
            _connectionId = "";

            Logger.Trace( string.Format( "OnDisconnected [{0}]", _connectionId ) );

            return base.OnDisconnected( stopCalled );
        }

        public override Task OnReconnected()
        {
            _connectionId = Context.ConnectionId;
            Logger.Trace( string.Format( "OnReconnected [{0}]", _connectionId ) );

            return base.OnReconnected();
        }
    }
}