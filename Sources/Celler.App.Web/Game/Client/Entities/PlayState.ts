﻿module Celler {
    export class PlayState extends Phaser.State {

        static cellSize = 65;
        static sightSize = 100;
        static homeSize = 150;
        static background = "#004400";

        session: Session;

        constructor() {
            super();
        }

        init() {
            this.game.stage.backgroundColor = PlayState.background;
        }

        preload() {
            this.preloadSprites( Suit.Blue );
            this.preloadSprites( Suit.Red );
        }

        create() {
            this.session = new Session( this.game );
        }

        update() {
            this.game.debug.text( `${app.playerId} [${app.tickCount}]`, 10, 20 );
        }
        
        private preloadSprites( suit: Suit ) {
            Assets.Sprites.load( suit, Assets.Type.Home );
            Assets.Sprites.load( suit, Assets.Type.CellBody );
            Assets.Sprites.load( suit, Assets.Type.CellEye );
            Assets.Sprites.load( suit, Assets.Type.Sight );
        }
    }
}