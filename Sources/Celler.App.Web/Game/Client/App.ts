module Game {
    export class App {

        game: Phaser.Game;
        hub: GameHub;

        constructor() {
            this.game = new Phaser.Game( 610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            } );
            this.hub = new GameHub();
        }

        create() {
            this.game.state.add( "PlayState", PlayState, true );
        }
    }

    var gameView: App;

    export function initApp() {
        gameView = new App();
    }
}

window.onload = () => {
    Game.initApp();
};