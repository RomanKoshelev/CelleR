module Celler {
    export class PlayState extends Phaser.State {

        static cellSize = 65;
        static sightSize = 100;
        static homeSize = 150;

        constructor() {
            super();
        }

        init() {
            this.game.stage.backgroundColor = "#004400";
        }

        preload() {
            this.loadSuitSprites( Suit.Blue );
            this.loadSuitSprites( Suit.Red );
        }

        create() {
            this.createObjects( Suit.Blue );
            this.createObjects( Suit.Red );
        }

        update() {
            this.game.debug.text( app.playerId, 10, 20);
        } 

        private getCornerCoords( suit: Suit, indent: number ): Phaser.Point {
            switch( suit ) {
            case Suit.Blue:
                return new Phaser.Point( indent, this.game.world.width - indent );
            case Suit.Red:
                return new Phaser.Point( this.game.world.width - indent, indent );
            }
            throw new Error( "wrong suit" );
        }

        private createObjects( suit: Suit ) {
            var sight = new Sight( this.game, suit, PlayState.sightSize );
            var home = new Home( this.game, suit, PlayState.homeSize );
            var cell = new Cell( this.game, suit, PlayState.cellSize );

            this.game.add.existing( home );
            this.game.add.existing( sight );
            this.game.add.existing( cell );

            home.position = this.getCornerCoords( suit, home.width / 2 );
            cell.position = home.position.clone();
            sight.position = cell.position.clone();

            this.game.world.sendToBack( sight );
            this.game.world.sendToBack( cell );
            this.game.world.sendToBack( home );
        }

        private loadSuitSprites( suit: Suit ) {
            this.loadSprite( suit, Assets.Type.Home );
            this.loadSprite( suit, Assets.Type.CellBody );
            this.loadSprite( suit, Assets.Type.CellEye );
            this.loadSprite( suit, Assets.Type.Sight );
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