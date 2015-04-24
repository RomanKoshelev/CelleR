module Celler {

    export class Sight extends Phaser.Sprite {

        constructor( game: Phaser.Game ) {
            super( game, 0, 0, Assets.Sprites.sight );
            this.init();
        }

        update() {
            this.doUpdate();
            super.update();
        }

        private init() {
            this.alpha = 0.5;
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
                app.server.updateSightCoords( this.position.x, this.position.y );
            }
            super.update();
        }
    }
}