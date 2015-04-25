module Celler {
    export class GameplayState extends Phaser.State {
        constructor() {
            super();
        }

        preload() {
            this.loadSprite( Suit.Common, Assets.Type.Playground );
            this.loadSprite( Suit.Red, Assets.Type.CellBody );
            this.loadSprite( Suit.Red, Assets.Type.Sight );
        }

        create() {
            this.game.add.existing( new Playground( this.game ) );
            this.game.add.existing( new Cell( this.game, Suit.Red ) );
            this.game.add.existing( new Sight( this.game, Suit.Red ) );
        }

        private loadSprite( suit: Suit, assetType: Assets.Type ) {
            var typeName = Assets.Type[ assetType ].toLowerCase();
            var suitName = Suit[ suit ].toLowerCase();
            this.game.load.image(
                Assets.Sprites.getSpriteKey( suit, assetType ),
                `${Assets.Sprites.path}/${suitName}/${typeName}.png` );
        }
    }
}