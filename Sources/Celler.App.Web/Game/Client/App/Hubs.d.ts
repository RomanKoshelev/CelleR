





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
      * Sends a "hintSightPosition" message to the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPointModel} 
      * @return {JQueryPromise of void}
      */
    hintSightPosition(position : SuitPointModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "moveCell" message to the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPointModel} 
      * @return {JQueryPromise of void}
      */
    moveCell(position : SuitPointModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "moveSight" message to the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPointModel} 
      * @return {JQueryPromise of void}
      */
    moveSight(position : SuitPointModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "getPlayerId" message to the GameHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of string}
      */
    getPlayerId() : JQueryPromise<string>;
}
 
interface GameHubClient
{
 
    /**
      * Set this function with a "function(position : SuitPointModel){}" to receive the "sightPositionHinted" message from the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPointModel} 
      * @return {void}
      */
    sightPositionHinted : (position : SuitPointModel) => void;
 
    /**
      * Set this function with a "function(position : SuitPointModel){}" to receive the "cellMoved" message from the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPointModel} 
      * @return {void}
      */
    cellMoved : (position : SuitPointModel) => void;
 
    /**
      * Set this function with a "function(position : SuitPointModel){}" to receive the "sightMoved" message from the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPointModel} 
      * @return {void}
      */
    sightMoved : (position : SuitPointModel) => void;
}
 
//#endregion GameHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.SuitPointModel
  */
interface SuitPointModel {
    Suit : string;
    X : number;
    Y : number;
}
 
//#endregion data contracts
 
