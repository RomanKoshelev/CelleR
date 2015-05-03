module Celler {

    export class ServerAdapter implements GameHubServer, GameHubClient {

        constructor() {
            this.init();
        }

        // --------------------------------------------------------[]
        // Server
        private server = $.connection.gameHub.server;

        hintSightPosition( position: SuitPointModel ): JQueryPromise<void> {
            return this.server.hintSightPosition( position );
        }

        moveCell( position: SuitPointModel ) {
            return this.server.moveCell( position );
        }

        moveSight( position: SuitPointModel ): JQueryPromise<void> {
            return this.server.moveSight( position );
        }

        getPlayerId(): JQueryPromise<string> {
            return this.server.getPlayerId();
        }

        getBounds(): JQueryPromise<BoundsModel> {
            return this.server.getBounds();
        }

        getSession(): JQueryPromise<SessionModel> {
            return this.server.getSession();
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
            this.client.sightPositionHinted = ( position: SuitPointModel ) => { this.sightPositionHinted( position ); };
            this.client.cellMoved = ( position: SuitPointModel ) => { this.cellMoved( position ); };
            this.client.sightMoved = ( position: SuitPointModel ) => { this.sightMoved( position ); };
            this.client.tickCountUpdated = ( count: number ) => { this.tickCountUpdated( count ); };

            $.connection.hub.start().done( () => { this.onStarted.dispatch() } );
        }

        sightPositionHinted( position: SuitPointModel ) {
            this.onSightPositionHinted.dispatch( position );
        }

        cellMoved( position: SuitPointModel ) {
            this.onCellMoved.dispatch( position );
        }

        sightMoved( position: SuitPointModel ) {
            this.onSightMoved.dispatch( position );
        }

        tickCountUpdated( count: number ) {
            this.onTickCountUpdated.dispatch( count );
        }
    }
}