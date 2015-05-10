// Celler (c) 2015 Krokodev
// Celler.App.Web
// IFood.cs

using System;

namespace Celler.App.Web.Game.Server.Entities.Interfaces
{
    public interface IFood {
        DateTime CreationTime { get; set; }
        double MaxValue { get; set; }
        double OscillationFrequency { get; set; }
    }
}