module Celler.CellParts {

    export class Part extends Phaser.Sprite {

        constructor( cell: Cell, assetType: Assets.Type ) {
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

    export class Eye extends Part {
        constructor( cell: Cell ) {
            super( cell, Assets.Type.CellEye );
            this.anchor.set( 0.5 );
        }
        setSize( size: number ) {
            this.scale.set( 1 );//size / this.texture.width );
        }
    }
}

module Celler {

    export class Cell extends Phaser.Group {

        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game );
            this.init( suit, size );
            app.server.onSightCoordsUpdated.add( this.onSightCoordsUpdated, this );
        }

        private body: CellParts.Body;
        private eye: CellParts.Eye;
        private eyeScale: number;

        private init( suit: Suit, size: number ) {
            this.suit = suit;
            this.addChild( this.body = new CellParts.Body( this ) );
            this.addChild( this.eye = new CellParts.Eye( this ) );
            this.scale.set( size / this.width );

            this.eyeScale = this.calcEyeScale();
            this.setEyeScale(this.eyeScale);
        }

        private onSightCoordsUpdated( model: SightModel ) {
            if( Suit[ model.Suit ] === this.suit ) {
                this.lookAt( new Phaser.Point( model.X, model.Y ) );
            }
        }

        private lookAt( p: Phaser.Point ) {
            var base = this.position;
            var r = this.width/4;
            var d = Phaser.Point.distance( base, p );
            var cs = this.width;
            var es = cs * this.eyeScale;
            var k = (cs - es)/2;
            var m = k / this.scale.x;

            p = Phaser.Point.subtract( p, base );
            p = p.normalize();
            p = p.multiply( m, m );

            this.eye.position = d>r? p : new Phaser.Point();
        }

        calcEyeScale(): number {
            return 0.75;
        }

        setEyeScale( eyeScale: number ) {
            this.eye.scale.set( eyeScale );
        }
    }
}