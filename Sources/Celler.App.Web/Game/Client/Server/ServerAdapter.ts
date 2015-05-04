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

        getBounds(): JQueryPromise<SizeModel> {
            return this.server.getBounds();
        }

        getSession(): JQueryPromise<SessionModel> {
            return this.server.getSession();
        }

        update(): JQueryPromise<void> {
            return this.server.update();
        }

        // --------------------------------------------------------[]
        // Client
        onSightPositionHinted = new Phaser.Signal();
        onCellMoved = new Phaser.Signal();
        onSightMoved = new Phaser.Signal();
        onStarted = new Phaser.Signal();
        onTickCountUpdated = new Phaser.Signal();

        private client = $.connection.gameHub.client;

        private init() {
            this.client.sightPositionHinted = ( id: string, position: PointModel ) => { this.sightPositionHinted( id, position ); };
            this.client.cellMoved = ( id: string, position: PointModel ) => { this.cellMoved( id, position ); };
            this.client.sightMoved = ( id: string, position: PointModel ) => { this.sightMoved( id, position ); };
            this.client.tickCountUpdated = ( count: number ) => { this.tickCountUpdated( count ); };

            $.connection.hub.start().done( () => { this.onStarted.dispatch() } );
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

        tickCountUpdated( count: number ) {
            this.onTickCountUpdated.dispatch( count );
        }
    }
}