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
            if( !this.inAnimation && this.position.distance( this.prevUpdatePosition ) > 1 ) {
                this.prevUpdatePosition = this.position.clone();
                app.server.hintSightPosition( this.toSuitPositionModel() );
            }
            super.update();
        }

        private onDragStop() {
            app.server.moveSight( this.toSuitPositionModel() );
            app.server.moveCell( this.toSuitPositionModel() );
        }

        inAnimation: boolean = false;

        private onSightMoved( position: SuitPositonModel ) {
            if( Suit[ position.Suit ] === this.suit ) {
                this.inAnimation = true;
                this.game.add.tween( this )
                    .to( { x: position.Position.X, y: position.Position.Y }, 100, Phaser.Easing.Circular.InOut, true )
                    .onComplete.addOnce( this.onAniationCompleete, this );
            }
        }

        private onAniationCompleete() {
            this.inAnimation = false;
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