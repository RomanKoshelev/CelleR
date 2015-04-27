module Celler {
    export class Sight extends SuitSprite {

        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game, suit, Assets.Type.Sight, size );

            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStop.add( this.onDragStop, this );

            app.server.onSightMoved.add( this.onSightMoved, this );
        }

        private prevUpdatePosition = new Phaser.Point( 0, 0 );

        update() {
            if( this.position.distance( this.prevUpdatePosition ) > 1 ) {
                this.prevUpdatePosition = this.position.clone();
                app.server.hintSightPosition( this.toSuitPositionModel() );
            }
            super.update();
        }

        private onDragStop() {
            app.server.moveCell( this.toSuitPositionModel() );
            app.server.moveSight( this.toSuitPositionModel() );
        }

        private onSightMoved( position: SuitPositonModel ) {
            if( Suit[ position.Suit ] === this.suit ) {
                this.position = new Phaser.Point( position.Position.X, position.Position.Y );
            }
        }

        private toSuitPositionModel(): SuitPositonModel {
            return {
                Suit: Suit[ this.suit ],
                Position: {
                    X: this.position.x,
                    Y: this.position.y
                }
            };
        }
    }
}