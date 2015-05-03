module Celler {

    export class App {

        game: Phaser.Game;
        server: ServerAdapter;
        playerId = "";
        playerSuit = Suit.Blue;
        tickCount: Number;

        constructor() {
            this.server = new ServerAdapter();
            this.server.onStarted.addOnce( this.init, this );
            this.server.onTickCountUpdated.add( this.onTickCountUpdated, this );
        }

        create() {
            this.game.state.add( "Room", Room, true );
        }

        private init() {
            this.server.getPlayerId().done( ( id: string ) => {
                this.playerId = id;
            } );

            this.server.getRoomData().done( ( room: RoomModel ) => {
                this.createGame( room.Width, room.Height );
            });
        }

        private createGame(width: number, height: number) {
            this.game = new Phaser.Game( width, height, Phaser.AUTO, "celler-playground", { create: this.create } );
        }

        private onTickCountUpdated( count: Number ) {
            this.tickCount = count;
        }
    }

    export var app: App;

    export function initApp() {
        app = new App();
    }
}

window.onload = () => {
    Celler.initApp();
};