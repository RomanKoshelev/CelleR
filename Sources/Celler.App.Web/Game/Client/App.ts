module Celler {
    export class App {

        game: Phaser.Game;
        server: GameConnector;

        constructor() {
            this.game = new Phaser.Game( 610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            } );
            this.server = new GameConnector();
        }

        create() {
            this.game.stage.backgroundColor = "#6aa84f";
            this.game.state.add( "PlayState", GameplayState, true );
        }
    }

    export var gameApp: App;

    export function initApp() {
        gameApp = new App();
    }
}

window.onload = () => {
    Celler.initApp();
};