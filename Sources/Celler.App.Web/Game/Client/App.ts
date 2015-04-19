// Code: Here: TS | Game.App.ts
module Game {
    export class App {

        game: Phaser.Game;
        hub: GameHub;

        constructor() {
            this.game = new Phaser.Game( 610, 610, Phaser.AUTO, "celler-playground", {
                preload: this.preload,
                create: this.create
            });
            this.hub = new GameHub ();
        }

        preload() {
            this.game.load.image( "ground", "/Game/Client/Assets/Sprites/ground.png" );
        }

        create() {
            this.game.stage.backgroundColor = "#6aa84f";
            var groudSprite = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, "ground" );
            groudSprite.anchor.setTo( 0.5, 0.5 );
            groudSprite.scale.setTo( 0.2, 0.2 );
            this.game.add.tween( groudSprite.scale ).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true );
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