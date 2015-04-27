﻿





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
      * @param sight {SightModel} 
      * @return {JQueryPromise of void}
      */
    updateSightCoords(sight : SightModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "moveCell" message to the GameHub hub.
      * Contract Documentation: ---
      * @param suit {string} 
      * @param position {PointModel} 
      * @return {JQueryPromise of void}
      */
    moveCell(suit : string, position : PointModel) : JQueryPromise<void>;
}
 
interface GameHubClient
{
 
    /**
      * Set this function with a "function(sight : SightModel){}" to receive the "sightCoordsUpdated" message from the GameHub hub.
      * Contract Documentation: ---
      * @param sight {SightModel} 
      * @return {void}
      */
    sightCoordsUpdated : (sight : SightModel) => void;
 
    /**
      * Set this function with a "function(cell : CellModel){}" to receive the "cellCoordsUpdated" message from the GameHub hub.
      * Contract Documentation: ---
      * @param cell {CellModel} 
      * @return {void}
      */
    cellCoordsUpdated : (cell : CellModel) => void;
}
 
//#endregion GameHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.CellModel
  */
interface CellModel {
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
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.SightModel
  */
interface SightModel {
    Suit : string;
    Position : PointModel;
}
 
//#endregion data contracts
 
