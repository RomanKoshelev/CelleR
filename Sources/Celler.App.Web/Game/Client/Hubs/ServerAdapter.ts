module Celler {

    export class ServerAdapter {

        onSightCoordsUpdated = new Phaser.Signal();

        constructor() {
            this.init();
        }

        updateSightCoords( sight: SightModel ) {
            if( this.ready ) {
                this.server.updateSightCoords( sight );
            }
        }

        private client = $.connection.gameHub.client;
        private server = $.connection.gameHub.server;
        private ready = false;

        private init() {
            this.client.sightCoordsUpdated = ( sight: SightModel ) => {
                this.sightCoordsUpdated( sight );
            };
            $.connection.hub.start().done( () => { this.ready = true; } );
        }

        private sightCoordsUpdated( sight: SightModel ) {
            this.onSightCoordsUpdated.dispatch( sight );
        }
    }
}