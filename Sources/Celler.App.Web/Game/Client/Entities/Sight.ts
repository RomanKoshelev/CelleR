module Celler {

    export class Sight extends Phaser.Sprite {

        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit, size: number  ) {
            super( game, 0, 0, Assets.Sprites.getSpriteKey( suit, Assets.Type.Sight ) );
            this.init( suit, size );
        }

        update() {
            this.doUpdate();
            super.update();
        }

        private init( suit: Suit, size: number ) {
            this.suit = suit;
            this.scale.set( size/this.width );
            this.anchor.set( 0.5 );

            this.inputEnabled = true;
            this.input.enableDrag();

            this.events.onDragStop.add(this.onDragStop, this);
        }

        private prevUpdatePosition = new Phaser.Point( 0, 0 );

        private doUpdate() {
            if( this.position.distance( this.prevUpdatePosition ) > 0 ) {
                this.prevUpdatePosition = this.position.clone();
                app.server.updateSightCoords( this.toModel() );
            }
        }

        private toModel(): SightModel {
            return {
                Suit: Suit[ this.suit ],
                Position: {
                    X: this.position.x,
                    Y: this.position.y
                }
            };
        }

        private onDragStop() {
            app.server.updateSightCoords( this.toModel() );
        }
    }
}