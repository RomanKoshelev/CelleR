// Celler (c) 2015 Krokodev
// Celler.App.Web
// ITimeLogic.cs

using System;

namespace Celler.App.Web.Game.Server.Logic
{
    public interface ITimeLogic
    {
        DateTime LastTime { get; set; }
        DateTime CurrentTime { get; set; }
        double GetUpdateInterval();
    }
}