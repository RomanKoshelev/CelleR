// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameManager.cs

using System;
using Celler.App.Web.Game.Server.Entities;

namespace Celler.App.Web.Game.Server.Logic
{
    public interface IGameManager
    {
        TimeSpan TimeAfterLastUpdate { get; set; }
        DateTime LastTime { get; set; }
        DateTime CurrentTime { get; set; }
        Size GetBounds();
    }
}