module Celler {

    export class ServerAdapter {

        onSightPositionHinted = new Phaser.Signal();
        onCellMoved = new Phaser.Signal();
        onSightMoved = new Phaser.Signal();
        onStarted = new Phaser.Signal();

        constructor() {
            this.init();
        }

        hintSightPosition( position: SuitPositonModel ) {
            this.server.hintSightPosition( position );
        }

        moveCell( position: SuitPositonModel ) {
            this.server.moveCell( position );
        }

        moveSight( position: SuitPositonModel ) {
            this.server.moveSight( position );
        }

        getPlayerId(): JQueryPromise<string> {
            return this.server.getPlayerId();
        }

        private client = $.connection.gameHub.client;
        private server = $.connection.gameHub.server;

        private init() {
            this.client.sightPositionHinted = ( position: SuitPositonModel ) => { this.sightPositionHinted( position ); };
            this.client.cellMoved = ( position: SuitPositonModel ) => { this.cellMoved( position ); };
            this.client.sightMoved = ( position: SuitPositonModel ) => { this.sightMoved( position ); };

            $.connection.hub.start().done( () => { this.onStarted.dispatch() } );
        }

        private sightPositionHinted( position: SuitPositonModel ) {
            this.onSightPositionHinted.dispatch( position );
        }

        private cellMoved( position: SuitPositonModel ) {
            this.onCellMoved.dispatch( position );
        }

        private sightMoved( position: SuitPositonModel ) {
            this.onSightMoved.dispatch( position );
        }
    }
}