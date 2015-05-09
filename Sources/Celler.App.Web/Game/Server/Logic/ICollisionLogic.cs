// Celler (c) 2015 Krokodev
// Celler.App.Web
// ICollisionLogic.cs

using System;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Entities.Interfaces;

namespace Celler.App.Web.Game.Server.Logic
{
    public interface ICollisionLogic
    {
        event Action< IBody, IBody > onCollision;
    }
}