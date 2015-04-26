module Celler {
    export class Home extends Phaser.Sprite {

        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game, 0, 0, Assets.Sprites.getSpriteKey( suit, Assets.Type.Home ) );
            this.scale.set( size / this.width );
            this.anchor.set( 0.5 );
        }
    }
}