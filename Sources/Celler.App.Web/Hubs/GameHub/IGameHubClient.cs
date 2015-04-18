// Celler (c) 2015 Krokodev
// Celler.App.Web
// IGameHubClient.cs

namespace Celler.App.Web.Hubs.GameHub
{
    public interface IGameHubClient
    {
        void fromServer( string msg );
    }
}