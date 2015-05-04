module Celler {
    export class Cell extends Phaser.Group {

        id: string;
        homeId: string;
        sightId: string;
        suit: Suit;
        sightPoint: Phaser.Point;

        constructor( game: Phaser.Game, model: CellModel) {
            super( game );
            this.init( model );
            app.server.onCellMoved.add( this.onCellMoved, this );
            app.server.onSightPositionHinted.add( this.onSightPositionHinted, this );
        }

        update() {
            this.lookAtSigtPoint();
            super.update();
        }

        private body: SuitSprite;
        private eye: SuitSprite;
        private eyeRate: number;

        private init( model: CellModel ) {
            this.id = model.Base.Id;
            this.sightId = model.SightId;
            this.homeId = model.HomeId;
            this.suit = Suit[model.Base.Suit];

            this.addChild( this.body = new SuitSprite( this.game, this.suit, Assets.Type.CellBody ) );
            this.addChild( this.eye = new SuitSprite( this.game, this.suit, Assets.Type.CellEye ) );
            
            this.scale.set( model.Base.Size / this.width );
            this.position = modelToPoint( model.Base.Position );

            this.updateEyeSize();
        }

        private onCellMoved( id: string , position: PointModel ) {
            if( this.id === id ) {
                this.game.add.tween( this )
                    .to( { x: position.X, y: position.Y }, 500, Phaser.Easing.Circular.InOut, true );
            }
        }

        private onSightPositionHinted( suit: string, position: PointModel ) {
            if ( Suit[suit] === this.suit ) {
                this.sightPoint = modelToPoint( position );
            }
        }

        private lookAtSigtPoint() {
            if ( this.sightPoint == null ) return;

            var p = this.sightPoint.clone();
            var l = Phaser.Point.distance( this.position, p );
            var c = this.width;
            var e = c * this.eyeRate;
            var r = c * 0.1;
            var d = ( c - e ) / 2;
            var m = d / this.scale.x;

            p = Phaser.Point.subtract( p, this.position );
            p = p.normalize();
            p = p.multiply( m, m );

            this.eye.position = l > r ? p : new Phaser.Point();
        }

        private calcEyeRate(): number {
            return 0.75;
        }

        private updateEyeSize() {
            this.eyeRate = this.calcEyeRate();
            this.eye.scale.set( this.eyeRate );
        }
    }
}