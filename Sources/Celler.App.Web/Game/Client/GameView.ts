// Code: Here: TS | GameView.ts
module Celler {
    export class GameView {

        constructor() {
            this.game = new Phaser.Game( 800, 600, Phaser.AUTO, "celler-playground", {
                preload: this.preload,
                create: this.create
            } );
        }

        game: Phaser.Game;

        preload() {}

        create() {
            this.game.stage.backgroundColor = "#b6d7a8";
        }
    }
}