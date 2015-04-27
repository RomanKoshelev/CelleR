module Celler {

    export class App {

        game: Phaser.Game;
        server: ServerAdapter;

        constructor() {
            this.server = new ServerAdapter();
            this.game = new Phaser.Game(
                600, 600,
                Phaser.AUTO,
                "celler-playground",
                {
                    create: this.create
                },
                false,
                true,
                null
            );
        }

        create() {
            this.game.state.add( "PlayState", PlayState, true );
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