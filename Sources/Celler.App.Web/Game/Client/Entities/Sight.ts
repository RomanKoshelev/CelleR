module Celler {

    export class Sight extends Phaser.Sprite {

        constructor( game: Phaser.Game ) {
            super( game, game.world.width / 2, game.world.height / 2, Assets.Sprites.Sight );

            this.alpha = 0.5;

            var scale = 0.15;
            this.anchor.setTo( 0.5, 0.5 );
            this.game.add.tween( this.scale ).to( { x: scale, y: scale }, 2000, Phaser.Easing.Bounce.Out, true );

            this.inputEnabled = true;
            this.input.enableDrag();
        }

        update() {
            var msg = this.position.toString();
            this.game.debug.text( msg, 10, 20 );

            if( this.position.distance( this.previousPosition ) > 10 ) {
                gameApp.connector.toServer( msg );
            }
            super.update();
        }
    }
}