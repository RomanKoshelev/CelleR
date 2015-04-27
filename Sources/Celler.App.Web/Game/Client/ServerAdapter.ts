module Celler {

    export class ServerAdapter {

        onSightCoordsUpdated = new Phaser.Signal();
        onCellCoordsUpdated = new Phaser.Signal();

        constructor() {
            this.init();
        }

        updateSightCoords( sight: SightModel ) {
            if( this.ready ) {
                this.server.updateSightCoords( sight );
            }
        }

        moveCell( suit: string, to: PointModel ) {
            if( this.ready ) {
                this.server.moveCell( suit, to );
            }
        }

        private client = $.connection.gameHub.client;
        private server = $.connection.gameHub.server;
        private ready = false;

        private init() {
            this.client.sightCoordsUpdated = ( sight: SightModel ) => { this.sightCoordsUpdated( sight ); };
            this.client.cellCoordsUpdated = ( cell: CellModel ) => { this.cellCoordsUpdated( cell ); };
            $.connection.hub.start().done( () => { this.ready = true; } );
        }

        private sightCoordsUpdated( sight: SightModel ) {
            this.onSightCoordsUpdated.dispatch( sight );
        }

        private cellCoordsUpdated( cell: CellModel ) {
            this.onCellCoordsUpdated.dispatch( cell );
        }
    }
}