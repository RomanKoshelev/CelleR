module Celler {
    export class SuitSprite extends Phaser.Sprite {
        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit, assetType: Assets.Type, size: number=0 ) {
            super( game, 0, 0, Assets.Sprites.getSpriteKey( suit, Assets.Type.Sight ) );
            this.suit = suit;
            this.anchor.set( 0.5 );
            if( size !== 0 ) {
                this.scale.set( size / this.width );
            }
        }
    }
}