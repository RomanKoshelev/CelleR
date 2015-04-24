module Celler.CellParts {

    export enum PartType {
        Body,
        Eye
    }

    export class Part extends Phaser.Sprite {
        partType: PartType;
        constructor( cell: Cell, partType: PartType, x: number, y: number, scale: number ) {
            this.parent = cell;
            this.partType = partType;

            var spriteName = Assets.Sprites.redBody;

            super( cell.game, x, y, spriteName );

            this.scale.setTo( scale, scale );
        }
    }

    export class Body extends Part {
        constructor( cell: Cell ) {
            super( cell, PartType.Body, 0, 0, 0.125 );
            this.anchor.setTo( 0.5, 0.5 );
        }
    }
}

module Celler {
    export class Cell extends Phaser.Group {

        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit ) {
            super( game );
            this.init( suit );
            gameApp.server.onSightCoordsUpdated.add( this.onSightCoordsUpdated, this);
        }

        private body: CellParts.Body;

        private init( suit: Suit ) {
            this.suit = suit;
            this.addChild( this.body = new CellParts.Body( this ) );

            this.body.visible = true;
            this.visible = true;
            this.position = new Phaser.Point ( 300, 400 );
        }

        private onSightCoordsUpdated( x,y: number ) {
            this.game.debug.text( `x:${x}, y:${y}`, 10, 20 );
        }
    }
}