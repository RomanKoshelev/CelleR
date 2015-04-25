module Celler {
    export class GameplayState extends Phaser.State {
        constructor() {
            super();
        }

        preload() {
            this.loadSprite( Suit.Common, Assets.Type.Playground );
            this.loadSprite( Suit.Red, Assets.Type.CellBody );
            this.loadSprite( Suit.Red, Assets.Type.Sight );
            this.loadSprite( Suit.Blue, Assets.Type.CellBody );
            this.loadSprite( Suit.Blue, Assets.Type.Sight );
        }

        create() {
            this.game.add.existing( new Playground( this.game ) );

            this.game.add.existing( new Cell( this.game, Suit.Red, this.getSpawnCoords( Suit.Red ) ) );
            this.game.add.existing( new Cell( this.game, Suit.Blue, this.getSpawnCoords( Suit.Blue ) ) );

            this.game.add.existing( new Sight( this.game, Suit.Red ) );
            this.game.add.existing( new Sight( this.game, Suit.Blue ) );
        }

        private loadSprite( suit: Suit, assetType: Assets.Type ) {
            var typeName = Assets.Type[ assetType ].toLowerCase();
            var suitName = Suit[ suit ].toLowerCase();
            this.game.load.image(
                Assets.Sprites.getSpriteKey( suit, assetType ),
                `${Assets.Sprites.path}/${suitName}/${typeName}.png` );
        }

        private getSpawnCoords( suit: Suit ): Phaser.Point {

            var cellSize = 20;

            switch( suit ) {
            case Suit.Blue:
                return new Phaser.Point( this.game.world.width - cellSize, cellSize );
            case Suit.Red:
                return new Phaser.Point( cellSize, this.game.world.width - cellSize );
            }

            throw new Error( "wrong suit" );
        }
    }
}