﻿// Celler (c) 2015 Krokodev
// Celler.App.Web
// Startup.cs

using Celler.App.Web;
using Microsoft.Owin;
using Owin;

[assembly : OwinStartup( typeof( Startup ) )]

namespace Celler.App.Web
{
    public class Startup
    {
        public void Configuration( IAppBuilder app )
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}