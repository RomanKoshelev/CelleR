





// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
 
////////////////////
// available hubs //
////////////////////
//#region available hubs
 
interface SignalR {
 
    /**
      * The hub implemented by Celler.App.Web.Game.Server.Hub.GameHub
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
      * Sends a "getPlayerId" message to the GameHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of string}
      */
    getPlayerId() : JQueryPromise<string>;
 
    /** 
      * Sends a "hintSightPosition" message to the GameHub hub.
      * Contract Documentation: ---
      * @param id {string} 
      * @param position {PointModel} 
      * @return {JQueryPromise of void}
      */
    hintSightPosition(id : string, position : PointModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "moveCell" message to the GameHub hub.
      * Contract Documentation: ---
      * @param id {string} 
      * @param position {PointModel} 
      * @return {JQueryPromise of void}
      */
    moveCell(id : string, position : PointModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "moveSight" message to the GameHub hub.
      * Contract Documentation: ---
      * @param id {string} 
      * @param position {PointModel} 
      * @return {JQueryPromise of void}
      */
    moveSight(id : string, position : PointModel) : JQueryPromise<void>;
 
    /** 
      * Sends a "getWorldBounds" message to the GameHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of SizeModel}
      */
    getWorldBounds() : JQueryPromise<SizeModel>;
 
    /** 
      * Sends a "getSession" message to the GameHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of SessionModel}
      */
    getSession() : JQueryPromise<SessionModel>;
 
    /** 
      * Sends a "update" message to the GameHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of void}
      */
    update() : JQueryPromise<void>;
}
 
interface GameHubClient
{
 
    /**
      * Set this function with a "function(id : string, position : PointModel){}" to receive the "sightPositionHinted" message from the GameHub hub.
      * Contract Documentation: ---
      * @param id {string} 
      * @param position {PointModel} 
      * @return {void}
      */
    sightPositionHinted : (id : string, position : PointModel) => void;
 
    /**
      * Set this function with a "function(id : string, position : PointModel){}" to receive the "cellMoved" message from the GameHub hub.
      * Contract Documentation: ---
      * @param id {string} 
      * @param position {PointModel} 
      * @return {void}
      */
    cellMoved : (id : string, position : PointModel) => void;
 
    /**
      * Set this function with a "function(id : string, position : PointModel){}" to receive the "sightMoved" message from the GameHub hub.
      * Contract Documentation: ---
      * @param id {string} 
      * @param position {PointModel} 
      * @return {void}
      */
    sightMoved : (id : string, position : PointModel) => void;
 
    /**
      * Set this function with a "function(tickCount : number){}" to receive the "tickCountUpdated" message from the GameHub hub.
      * Contract Documentation: ---
      * @param tickCount {number} 
      * @return {void}
      */
    tickCountUpdated : (tickCount : number) => void;
 
    /**
      * Set this function with a "function(foodModel : FoodModel){}" to receive the "foodAdded" message from the GameHub hub.
      * Contract Documentation: ---
      * @param foodModel {FoodModel} 
      * @return {void}
      */
    foodAdded : (foodModel : FoodModel) => void;
 
    /**
      * Set this function with a "function(id : string){}" to receive the "foodRemoved" message from the GameHub hub.
      * Contract Documentation: ---
      * @param id {string} 
      * @return {void}
      */
    foodRemoved : (id : string) => void;
 
    /**
      * Set this function with a "function(models : FoodModel[]){}" to receive the "foodsUpdated" message from the GameHub hub.
      * Contract Documentation: ---
      * @param models {FoodModel[]} 
      * @return {void}
      */
    foodsUpdated : (models : FoodModel[]) => void;
 
    /**
      * Set this function with a "function(models : HomeModel[]){}" to receive the "homesUpdated" message from the GameHub hub.
      * Contract Documentation: ---
      * @param models {HomeModel[]} 
      * @return {void}
      */
    homesUpdated : (models : HomeModel[]) => void;
}
 
//#endregion GameHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.HomeModel
  */
interface HomeModel {
    Base : GameObjectModel;
    Value : number;
    MaxValue : number;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.GameObjectModel
  */
interface GameObjectModel {
    Id : string;
    Suit : string;
    Position : PointModel;
    Size : number;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.FoodModel
  */
interface FoodModel {
    Base : GameObjectModel;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.SessionModel
  */
interface SessionModel {
    Id : string;
    Cells : CellModel[];
    Homes : HomeModel[];
    Sights : SightModel[];
    Foods : FoodModel[];
    UpdateInterval : number;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.SightModel
  */
interface SightModel {
    Base : GameObjectModel;
    CellId : string;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.CellModel
  */
interface CellModel {
    Base : GameObjectModel;
    HomeId : string;
    SightId : string;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.SizeModel
  */
interface SizeModel {
    Width : number;
    Height : number;
}
 
 
/**
  * Data contract for Celler.App.Web.Game.Server.Models.PointModel
  */
interface PointModel {
    X : number;
    Y : number;
}
 
//#endregion data contracts
 
