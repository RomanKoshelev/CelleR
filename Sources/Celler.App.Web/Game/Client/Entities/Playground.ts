module Celler {
    export class Playground extends Phaser.Sprite {

        constructor( game: Phaser.Game ) {
            super(
                game,
                game.world.width / 2,
                game.world.height / 2,
                Assets.Sprites.getSpriteKey( Suit.Common, Assets.Type.Playground ) );
            this.alpha = 0.5;
            this.anchor.setTo( 0.5, 0.5 );
        }
    }
}