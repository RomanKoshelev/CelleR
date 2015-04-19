// Code: Here: TS | GameView.ts
module Celler {
    export class GameView {

        constructor() {
            this.game = new Phaser.Game( 800, 800, Phaser.AUTO, "celler-playground", {
                preload: this.preload,
                create: this.create
            } );
        }

        game: Phaser.Game;

        preload() {
            this.game.load
                .image( "logo", "/Game/Sprites/Phaser-Logo-Small.png" )
                .image( "sample", "/Game/Sprites/Sample.png" );
        }

        create() {
            var logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, "sample" );

            logo.anchor.setTo( 0.5, 0.5 );
            logo.scale.setTo( 0.2, 0.2 );

            this.game.add.tween( logo.scale ).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true );
        }
    }
}