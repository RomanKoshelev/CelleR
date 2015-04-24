module Celler {
    export class App {

        game: Phaser.Game;
        server: Server;

        constructor() {
            this.server = new Server();
            this.game = new Phaser.Game( 610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            } );
        }

        create() {
            this.game.stage.backgroundColor = "#6aa84f";
            this.game.state.add( "PlayState", GameplayState, true );
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