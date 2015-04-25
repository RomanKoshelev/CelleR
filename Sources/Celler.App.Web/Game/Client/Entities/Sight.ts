module Celler {

    export class Sight extends Phaser.Sprite {

        suit: Suit;

        constructor( game: Phaser.Game, suit: Suit ) {
            super( game, 0, 0, Assets.Sprites.getSpriteKey( suit, Assets.Type.Sight ) );
            this.init( suit );
        }

        update() {
            this.doUpdate();
            super.update();
        }

        private init( suit: Suit ) {
            this.suit = suit;
            this.alpha = 0.85;
            this.scale.x = this.scale.y = 0.15;
            this.anchor.setTo( 0.5, 0.5 );
            this.position.setTo( this.game.world.width / 2, this.game.world.height / 2 );

            this.inputEnabled = true;
            this.input.enableDrag();
        }

        private prevUpdatePosition = new Phaser.Point( 0, 0 );

        private doUpdate() {
            if( this.position.distance( this.prevUpdatePosition ) > 10 ) {
                this.prevUpdatePosition = this.position.clone();
                app.server.updateSightCoords( this.toModel() );
            }
        }

        private toModel(): SightModel {
            return {
                Suit: Suit[ this.suit ],
                X: this.position.x,
                Y: this.position.y
            };
        }
    }
}