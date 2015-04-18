// Crimenuts (c) 2015 Crocodev
// Research.Signalr.Typescript
// ChatHub.cs

using System;
using System.Globalization;
using Microsoft.AspNet.SignalR;
using NLog;

namespace Research.Signalr.Typescript.Hubs
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