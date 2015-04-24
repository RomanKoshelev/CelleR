module Celler {
    export class GameConnector {

        onFromServer = new Phaser.Signal();

        constructor() {
            this.init();
        }

        sendMessageToServer( msg: string ): void {
            this.server.toServer( msg );
        }

        private client = $.connection.gameHub.client;
        private server = $.connection.gameHub.server;

        private init() {
            this.client.fromServer = ( msg: string ) => {
                this.dispatchSignalOnFromServer( msg );
            };
            $.connection.hub.start();
        }

        private dispatchSignalOnFromServer( msg: string ) {
            this.onFromServer.dispatch( msg );
        }
    }
}