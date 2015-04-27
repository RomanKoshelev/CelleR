module Celler {

    class CellPart extends Phaser.Sprite {

        constructor( cell: Cell, assetType: Assets.Type ) {
            this.parent = cell;
            super( cell.game, 0, 0, Assets.Sprites.getSpriteKey( cell.suit, assetType ) );
            this.anchor.set( 0.5 );
            this.parent = cell;
        }
    }

    export class Cell extends Phaser.Group {

        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game );
            this.init( suit, size );
            app.server.onSightCoordsUpdated.add( this.onSightCoordsUpdated, this );
        }

        private body: CellPart;
        private eye: CellPart;
        private eyeScale: number;

        private init( suit: Suit, size: number ) {
            this.suit = suit;
            this.addChild( this.body = new CellPart( this, Assets.Type.CellBody ) );
            this.addChild( this.eye = new CellPart( this, Assets.Type.CellEye ) );
            this.scale.set( size / this.width );

            this.eyeScale = this.calcEyeScale();
            this.setEyeScale(this.eyeScale);
        }

        private onSightCoordsUpdated( model: SightModel ) {
            if( Suit[ model.Suit ] === this.suit ) {
                this.lookAt( new Phaser.Point( model.Position.X, model.Position.Y ) );
            }
        }

        private lookAt( p: Phaser.Point ) {
            var r = this.width*0.1;
            var l = Phaser.Point.distance( this.position, p );
            var c = this.width;
            var e = c * this.eyeScale;
            var d = (c - e)/2;
            var m = d / this.scale.x;

            p = Phaser.Point.subtract( p, this.position );
            p = p.normalize();
            p = p.multiply( m, m );

            this.eye.position = l>r? p : new Phaser.Point();
        }

        calcEyeScale(): number {
            return 0.75;
        }

        setEyeScale( eyeScale: number ) {
            this.eye.scale.set( eyeScale );
        }
    }
}