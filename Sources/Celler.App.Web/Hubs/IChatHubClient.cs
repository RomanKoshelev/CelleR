namespace Research.Signalr.Typescript.Hubs
{
    public interface IChatHubClient
    {
        void addNewMessageToPage( ChatMessage msg );
    }
}