module Celler {
    export class Sight extends SuitSprite {

        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game, suit, Assets.Type.Sight, size );
            this.init();
        }

        update() {
            this.doUpdate();
            super.update();
        }

        private init() {
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStop.add( this.onDragStop, this );
        }

        private prevUpdatePosition = new Phaser.Point( 0, 0 );

        private doUpdate() {
            if( this.position.distance( this.prevUpdatePosition ) > 0 ) {
                this.prevUpdatePosition = this.position.clone();
                app.server.updateSightCoords( this.toSightModel() );
            }
        }

        private onDragStop() {
            app.server.moveCell( Suit[ this.suit ], this.toPointModel() );
        }

        private toSightModel(): SightModel {
            return {
                Suit: Suit[ this.suit ],
                Position: this.toPointModel()
            };
        }

        private toPointModel(): PointModel {
            return {
                X: this.position.x,
                Y: this.position.y
            };
        }
    }
}