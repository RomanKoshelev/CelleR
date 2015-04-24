module Celler {
    export class GameConnector {

        onSightCoordsUpdated = new Phaser.Signal();

        constructor() {
            this.init();
        }

        updateSightCoords( x, y: number ): void {
            if( this.ready ) {
                this.server.updateSightCoords( x, y );
            }
        }

        private client = $.connection.gameHub.client;
        private server = $.connection.gameHub.server;
        private ready = false;

        private init() {
            this.client.sightCoordsUpdated = ( x,y : number ) => {
                this.sightCoordsUpdated( x, y );
            };
            $.connection.hub.start().done( () => { this.ready = true; } );
        }

        private sightCoordsUpdated( x,y : number ) {
            this.onSightCoordsUpdated.dispatch( x,y );
        }
    }
}