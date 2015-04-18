





// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
 
////////////////////
// available hubs //
////////////////////
//#region available hubs
 
interface SignalR {
 
    /**
      * The hub implemented by Celler.App.Web.Hubs.ChatHub.ChatHub
      */
    chatHub : ChatHub;
}
//#endregion available hubs
 
///////////////////////
// Service Contracts //
///////////////////////
//#region service contracts
 
//#region ChatHub hub
 
interface ChatHub {
    
    /**
      * This property lets you send messages to the ChatHub hub.
      */
    server : ChatHubServer;
 
    /**
      * The functions on this property should be replaced if you want to receive messages from the ChatHub hub.
      */
    client : ChatHubClient;
}
 
interface ChatHubServer {
 
    /** 
      * Sends a "send" message to the ChatHub hub.
      * Contract Documentation: ---
      * @param msg {ChatMessage} 
      * @return {JQueryPromise of void}
      */
    send(msg : ChatMessage) : JQueryPromise<void>;
}
 
interface ChatHubClient
{
 
    /**
      * Set this function with a "function(msg : ChatMessage){}" to receive the "addNewMessageToPage" message from the ChatHub hub.
      * Contract Documentation: ---
      * @param msg {ChatMessage} 
      * @return {void}
      */
    addNewMessageToPage : (msg : ChatMessage) => void;
}
 
//#endregion ChatHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
 
/**
  * Data contract for Celler.App.Web.Hubs.ChatHub.ChatMessage
  */
interface ChatMessage {
    Name : string;
    Message : string;
}
 
//#endregion data contracts
 
