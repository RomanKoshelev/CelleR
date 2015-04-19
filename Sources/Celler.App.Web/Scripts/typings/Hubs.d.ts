





// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
 
////////////////////
// available hubs //
////////////////////
//#region available hubs
 
interface SignalR {
 
    /**
      * The hub implemented by Celler.App.Web.Hubs.GameHub.GameHub
      */
    gameHub : GameHub;
}
//#endregion available hubs
 
///////////////////////
// Service Contracts //
///////////////////////
//#region service contracts
 
//#region GameHub hub
 
interface GameHub {
    
    /**
      * This property lets you send messages to the GameHub hub.
      */
    server : GameHubServer;
 
    /**
      * The functions on this property should be replaced if you want to receive messages from the GameHub hub.
      */
    client : GameHubClient;
}
 
interface GameHubServer {
 
    /** 
      * Sends a "toServer" message to the GameHub hub.
      * Contract Documentation: ---
      * @param msg {string} 
      * @return {JQueryPromise of void}
      */
    toServer(msg : string) : JQueryPromise<void>;
}
 
interface GameHubClient
{
 
    /**
      * Set this function with a "function(msg : string){}" to receive the "fromServer" message from the GameHub hub.
      * Contract Documentation: ---
      * @param msg {string} 
      * @return {void}
      */
    fromServer : (msg : string) => void;
}
 
//#endregion GameHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
//#endregion data contracts
 
