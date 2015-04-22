module Celler {
    export class Playground extends Phaser.Sprite {

        constructor( game: Phaser.Game ) {
            super( game, game.world.width / 2, game.world.height / 2, Assets.Sprites.playground );
            this.anchor.setTo( 0.5, 0.5 );
            this.scale.setTo( 1, 1 );
        }
    }
}