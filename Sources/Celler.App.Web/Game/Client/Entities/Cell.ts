module Celler.CellParts {

    export class Part extends Phaser.Sprite {

        constructor( cell: Cell, assetType: Assets.Type) {
            this.parent = cell;
            super( cell.game, 0, 0, Assets.Sprites.getSpriteKey( cell.suit, assetType ) );
            this.parent = cell;
        }
    }

    export class Body extends Part {
        constructor( cell: Cell ) {
            super( cell, Assets.Type.CellBody );
            this.anchor.set( 0.5 );
        }
    }
}

module Celler {

    export class Cell extends Phaser.Group {

        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit, size: number) {
            super( game );
            this.init( suit, size );
            app.server.onSightCoordsUpdated.add( this.onSightCoordsUpdated, this );
        }

        private body: CellParts.Body;

        private init( suit: Suit, size: number ) {
            this.suit = suit;
            this.addChild( this.body = new CellParts.Body( this ) );
            this.scale.set( size / this.width );
        }

        private onSightCoordsUpdated( model: SightModel ) {
            if( Suit[ model.Suit ] === this.suit ) {
                this.game.debug.text( `x=${model.X}, y=${model.Y}`, 10, 20 );
                this.position.setTo( model.X, model.Y );
            }
        }
    }
}