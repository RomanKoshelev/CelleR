// Celler (c) 2015 Krokodev
// Celler.App.Web
// ChatHub.cs

using Microsoft.AspNet.SignalR;
using NLog;

namespace Celler.App.Web.Hubs
{
    public partial class ChatHub : Hub
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public ChatHub()
        {
            Logger.Trace( "ChatHub ctor" );
        }

        public void Send( ChatMessage msg )
        {
            Logger.Trace( "Send( {0} )", msg.Message );
            Clients.All.addNewMessageToPage( msg );
        }
    }
}