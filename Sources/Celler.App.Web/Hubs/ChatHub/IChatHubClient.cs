// Celler (c) 2015 Krokodev
// Celler.App.Web
// IChatHubClient.cs

namespace Celler.App.Web.Hubs.ChatHub
{
    public interface IChatHubClient
    {
        void addNewMessageToPage( ChatMessage msg );
    }
}