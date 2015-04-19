module Celler {
    export class Playground extends Phaser.Sprite {

        constructor( game: Phaser.Game ) {
            super( game, game.world.width / 2, game.world.height / 2, Assets.Sprites.Playground );
            this.anchor.setTo( 0.5, 0.5 );
            this.scale.setTo( 0.95, 0.95 );
            this.game.add.tween( this.scale ).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true );
        }
    }
}