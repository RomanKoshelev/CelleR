﻿module Celler.CellParts {

    export class Part extends Phaser.Sprite {
        constructor( cell: Cell, assetType: Assets.Type, scale: number=1, x: number=0, y: number=0) {
            this.parent = cell;
            super( cell.game, x, y, Assets.Sprites.getSpriteKey( cell.suit, assetType ) );
            this.scale.setTo( scale, scale );
        }
    }

    export class Body extends Part {
        constructor( cell: Cell ) {
            super( cell, Assets.Type.CellBody, 0.125 );
            this.anchor.setTo( 0.5, 0.5 );
        }
    }
}

module Celler {
    export class Cell extends Phaser.Group {

        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit, position: Phaser.Point ) {
            super( game );
            this.init( suit, position );
            app.server.onSightCoordsUpdated.add( this.onSightCoordsUpdated, this );
        }

        private body: CellParts.Body;

        private init( suit: Suit, position: Phaser.Point ) {
            this.suit = suit;
            this.addChild( this.body = new CellParts.Body( this ) );

            this.body.visible = true;
            this.visible = true;
            this.position = position.clone();
        }

        private onSightCoordsUpdated( sight: SightModel ) {
            this.game.debug.text( `x=${sight.X}, y=${sight.Y}`, 10, 20 );
            //this.position.setTo( sight.X, sight.Y );
        }
    }
}