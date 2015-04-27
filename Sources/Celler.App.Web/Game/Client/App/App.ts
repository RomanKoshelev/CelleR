module Celler {

    export class App {

        static gameSize = 720;

        game: Phaser.Game;
        server: ServerAdapter;
        playerId = "";

        constructor() {
            this.server = new ServerAdapter();
            this.server.onStarted.addOnce( this.initGame, this );
        }

        create() {
            this.game.state.add( "PlayState", PlayState, true );
        }

        private initGame() {
            this.game = new Phaser.Game(
                App.gameSize, App.gameSize,
                Phaser.AUTO,
                "celler-playground",
                {
                    create: this.create,
                },
                false,
                true,
                null
                );

            this.server.getPlayerId().done ( ( id: string ) => {
                this.playerId = id;
            });
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