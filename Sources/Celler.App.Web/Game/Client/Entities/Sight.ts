module Celler {

    export class Sight extends Phaser.Sprite {

        constructor(game: Phaser.Game) {
            super( game, game.world.width / 2, game.world.height / 2, Assets.Sprites.sight );
            var scale = 0.1;
            this.anchor.setTo( 0.5, 0.5 );
            this.game.add.tween( this.scale ).to( { x: scale, y: scale }, 2000, Phaser.Easing.Bounce.Out, true );
        }
    }
}