﻿module Celler {
    export class Play extends Phaser.State {
        constructor() {
            super();
        }

        static cellSize = 60;
        static sightSize = 80;
        static homeSize = 100;
        static eyeMinSize = 10;
        static eyeMaxSize = 50;

        preload() {
            this.loadSprite( Suit.Red, Assets.Type.Home );
            this.loadSprite( Suit.Red, Assets.Type.CellBody );
            this.loadSprite( Suit.Red, Assets.Type.Sight );

            this.loadSprite( Suit.Blue, Assets.Type.Home );
            this.loadSprite( Suit.Blue, Assets.Type.CellBody );
            this.loadSprite( Suit.Blue, Assets.Type.Sight );
        }

        create() {
            this.createSuitObjects( Suit.Red );
            this.createSuitObjects( Suit.Blue );
        }

        private loadSprite( suit: Suit, assetType: Assets.Type ) {
            var typeName = Assets.Type[ assetType ].toLowerCase();
            var suitName = Suit[ suit ].toLowerCase();
            this.game.load.image(
                Assets.Sprites.getSpriteKey( suit, assetType ),
                `${Assets.Sprites.path}/${suitName}/${typeName}.png` );
        }

        private getCornerCoords( suit: Suit, indent: number ): Phaser.Point {
            switch( suit ) {
            case Suit.Blue:
                return new Phaser.Point( this.game.world.width - indent, indent );
            case Suit.Red:
                return new Phaser.Point( indent, this.game.world.width - indent );
            }
            throw new Error( "wrong suit" );
        }


        createSuitObjects( suit: Suit ) {
            var sight = new Sight( this.game, suit, Play.sightSize );
            var home = new Home( this.game, suit, Play.homeSize );
            var cell = new Cell( this.game, suit, Play.cellSize );

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
    }
}