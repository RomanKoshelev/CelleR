





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
      * @param position {SuitPositonModel} 
      * @return {JQueryPromise of void}
      */
    hintSightPosition(position : SuitPositonModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "moveCell" message to the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPositonModel} 
      * @return {JQueryPromise of void}
      */
    moveCell(position : SuitPositonModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "moveSight" message to the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPositonModel} 
      * @return {JQueryPromise of void}
      */
    moveSight(position : SuitPositonModel) : JQueryPromise<void>;
 
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
      * Set this function with a "function(position : SuitPositonModel){}" to receive the "sightPositionHinted" message from the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPositonModel} 
      * @return {void}
      */
    sightPositionHinted : (position : SuitPositonModel) => void;
 
    /**
      * Set this function with a "function(position : SuitPositonModel){}" to receive the "cellMoved" message from the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPositonModel} 
      * @return {void}
      */
    cellMoved : (position : SuitPositonModel) => void;
 
    /**
      * Set this function with a "function(position : SuitPositonModel){}" to receive the "sightMoved" message from the GameHub hub.
      * Contract Documentation: ---
      * @param position {SuitPositonModel} 
      * @return {void}
      */
    sightMoved : (position : SuitPositonModel) => void;
}
 
//#endregion GameHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.SuitPositonModel
  */
interface SuitPositonModel {
    Suit : string;
    Position : PointModel;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.PointModel
  */
interface PointModel {
    X : number;
    Y : number;
}
 
//#endregion data contracts
 
