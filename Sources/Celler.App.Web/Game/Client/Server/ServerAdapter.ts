module Celler {

    export class ServerAdapter {

        onSightPositionHinted = new Phaser.Signal();
        onCellMoved = new Phaser.Signal();
        onSightMoved = new Phaser.Signal();
        onStarted = new Phaser.Signal();

        constructor() {
            this.init();
        }

        hintSightPosition( position: SuitPointModel ) {
            this.server.hintSightPosition( position );
        }

        moveCell( position: SuitPointModel ) {
            this.server.moveCell( position );
        }

        moveSight( position: SuitPointModel ) {
            this.server.moveSight( position );
        }

        getPlayerId(): JQueryPromise<string> {
            return this.server.getPlayerId();
        }

        getRoomData(): JQueryPromise<RoomModel> {
            return this.server.getRoomData();
        }

        private client = $.connection.gameHub.client;
        private server = $.connection.gameHub.server;

        private init() {
            this.client.sightPositionHinted = ( position: SuitPointModel ) => { this.sightPositionHinted( position ); };
            this.client.cellMoved = ( position: SuitPointModel ) => { this.cellMoved( position ); };
            this.client.sightMoved = ( position: SuitPointModel ) => { this.sightMoved( position ); };

            $.connection.hub.start().done( () => { this.onStarted.dispatch() } );
        }

        private sightPositionHinted( position: SuitPointModel ) {
            this.onSightPositionHinted.dispatch( position );
        }

        private cellMoved( position: SuitPointModel ) {
            this.onCellMoved.dispatch( position );
        }

        private sightMoved( position: SuitPointModel ) {
            this.onSightMoved.dispatch( position );
        }
    }
}