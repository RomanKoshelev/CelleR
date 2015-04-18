// Celler (c) 2015 Krokodev
// Celler.App.Web
// IChatHubClient.cs

namespace Celler.App.Web.Hubs
{
    public interface IChatHubClient
    {
        void addNewMessageToPage( ChatMessage msg );
    }
}