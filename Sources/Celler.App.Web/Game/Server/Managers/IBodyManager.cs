// Celler (c) 2015 Krokodev
// Celler.App.Web
// IBodyManager.cs

using System.Collections.Generic;
using Celler.App.Web.Game.Server.Entities.Interfaces;

namespace Celler.App.Web.Game.Server.Managers
{
    public interface IBodyManager
    {
        IList< IBody > GetBodies();
    }
}