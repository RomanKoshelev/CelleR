﻿module Celler {

    export class App {

        game: Phaser.Game;
        server: ServerAdapter;
        static gameSize = 720;

        constructor() {
            this.server = new ServerAdapter();
            this.game = new Phaser.Game(
                App.gameSize, App.gameSize,
                Phaser.AUTO,
                "celler-playground",
                {
                    create: this.create
                },
                false,
                true,
                null
            );
        }

        create() {
            this.game.state.add( "PlayState", PlayState, true );
        }
    }

    export var app: App;

    export function initApp() {
        app = new App();
    }
}

window.onload = () => {
    Celler.initApp();
};