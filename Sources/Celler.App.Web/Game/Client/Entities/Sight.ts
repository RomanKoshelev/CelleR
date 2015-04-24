module Celler {

    export class Sight extends Phaser.Sprite {

        constructor( game: Phaser.Game ) {
            super( game, game.world.width / 2, game.world.height / 2, Assets.Sprites.sight );

            this.alpha = 0.5;
            this.scale.x = this.scale.y = 0.15;
            this.anchor.setTo( 0.5, 0.5 );

            this.inputEnabled = true;
            this.input.enableDrag();

            this.onUpdateCoords.add( this.showCoordsMessage, this );
        }

        onUpdateCoords = new Phaser.Signal();

        prevUpdatePosition = new Phaser.Point( 0, 0 );

        update() {
            var msg = this.position.toString();

            if( this.position.distance( this.prevUpdatePosition ) > 10 ) {
                gameApp.connector.toServer( msg );
                this.prevUpdatePosition = this.position.clone();
                this.onUpdateCoords.dispatch( msg );
            }
            super.update();
        }

        showCoordsMessage( msg: string ) {
            this.game.debug.text( msg, 10, 20 );
        }
    }
}