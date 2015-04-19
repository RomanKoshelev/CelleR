module Game {
    export class PlayState extends Phaser.State {
        game: Phaser.Game;
        playground: Playground;

        constructor() {
            super();
        }

        preload() {
            this.game.load.image( "ground", "/Game/Client/Assets/Sprites/ground.png" );
        }

        create() {
            this.playground = new Playground( this.game );
            this.game.add.existing( this.playground );
        }
    }
}