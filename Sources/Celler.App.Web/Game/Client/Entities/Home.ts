module Celler {
    export class Home extends SuitSprite {
        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game, suit, Assets.Type.Home, size );
        }
    }
}