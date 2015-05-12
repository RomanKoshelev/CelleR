module Celler {

    export class ServerAdapter implements GameHubServer, GameHubClient {

        constructor() {
            this.init();
        }

        // --------------------------------------------------------[]
        // Server
        private server = $.connection.gameHub.server;

        hintSightPosition( id: string, position: PointModel ): JQueryPromise<void> {
            return this.server.hintSightPosition( id, position );
        }

        moveCell( id: string, position: PointModel ): JQueryPromise<void> {
            return this.server.moveCell( id, position );
        }

        moveSight( id: string, position: PointModel ): JQueryPromise<void> {
            return this.server.moveSight( id, position );
        }

        getPlayerId(): JQueryPromise<string> {
            return this.server.getPlayerId();
        }

        getWorldBounds(): JQueryPromise<SizeModel> {
            return this.server.getWorldBounds();
        }

        getSession(): JQueryPromise<SessionModel> {
            return this.server.getSession();
        }

        update(): JQueryPromise<void> {
            return this.server.update();
        }

        resetSession(): JQueryPromise<void> {
             return this.server.resetSession();
        }

        // --------------------------------------------------------[]
        // Client
        onSightPositionHinted = new Phaser.Signal();
        onCellMoved = new Phaser.Signal();
        onSightMoved = new Phaser.Signal();
        onStarted = new Phaser.Signal();
        onFoodAdded = new Phaser.Signal();
        onFoodRemoved = new Phaser.Signal();
        onFoodsUpdated = new Phaser.Signal();
        onHomesUpdated = new Phaser.Signal();
        onSessionUpdated = new Phaser.Signal();
        onTickCountUpdated = new Phaser.Signal();

        private client = $.connection.gameHub.client;

        private init() {
            this.setupClientCallbacks();
            this.startHub();
        }

        startHub() {
            $.connection.hub.start().done( () => { this.onStarted.dispatch() } );
        }

        private setupClientCallbacks() {
            this.client.sightPositionHinted = ( id: string, position: PointModel ) => { this.sightPositionHinted( id, position ); };
            this.client.cellMoved = ( id: string, position: PointModel ) => { this.cellMoved( id, position ); };
            this.client.sightMoved = ( id: string, position: PointModel ) => { this.sightMoved( id, position ); };
            this.client.foodAdded = ( food: FoodModel ) => { this.foodAdded( food ); };
            this.client.foodRemoved = ( id: string ) => { this.foodRemoved( id ); };
            this.client.foodsUpdated = ( models: FoodModel[] ) => { this.foodsUpdated( models ); };
            this.client.homesUpdated = ( models: HomeModel[] ) => { this.homesUpdated( models ); };
            this.client.tickCountUpdated = ( count: number ) => { this.tickCountUpdated( count ); };
            this.client.sessionUpdated = ( model: SessionModel ) => { this.sessionUpdated( model ); };
        }

        sightPositionHinted( id: string, position: PointModel ) {
            this.onSightPositionHinted.dispatch( id, position );
        }

        cellMoved( id: string, position: PointModel ) {
            this.onCellMoved.dispatch( id, position );
        }

        sightMoved( id: string, position: PointModel ) {
            this.onSightMoved.dispatch( id, position );
        }

        foodAdded( foodModel: FoodModel ): void {
            this.onFoodAdded.dispatch( foodModel );
        }

        tickCountUpdated( count: number ) {
            this.onTickCountUpdated.dispatch( count );
        }

        foodRemoved( id: string ): void {
            this.onFoodRemoved.dispatch( id );
        }

        foodsUpdated( models: FoodModel[] ): void {
            this.onFoodsUpdated.dispatch( models );
        }

        homesUpdated( models: HomeModel[] ): void {
            this.onHomesUpdated.dispatch( models );
        }

        sessionUpdated( model: SessionModel ): void {
            this.onSessionUpdated.dispatch( model );
        }
    }
}