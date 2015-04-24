





// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
 
////////////////////
// available hubs //
////////////////////
//#region available hubs
 
interface SignalR {
 
    /**
      * The hub implemented by Celler.App.Web.Game.Server.GameHub.GameHub
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
      * Sends a "updateSightCoords" message to the GameHub hub.
      * Contract Documentation: ---
      * @param x {number} 
      * @param y {number} 
      * @return {JQueryPromise of void}
      */
    updateSightCoords(x : number, y : number) : JQueryPromise<void>;
}
 
interface GameHubClient
{
 
    /**
      * Set this function with a "function(x : number, y : number){}" to receive the "sightCoordsUpdated" message from the GameHub hub.
      * Contract Documentation: ---
      * @param x {number} 
      * @param y {number} 
      * @return {void}
      */
    sightCoordsUpdated : (x : number, y : number) => void;
}
 
//#endregion GameHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
//#endregion data contracts
 
