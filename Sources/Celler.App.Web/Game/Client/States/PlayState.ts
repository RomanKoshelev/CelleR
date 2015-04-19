module Celler {
    export class GameplayState extends Phaser.State {
        constructor() {
            super();
        }

        preload() {
            this.game.load.image( Assets.Sprites.playground, "/Game/Client/Assets/Sprites/ground.png" );
            this.game.load.image( Assets.Sprites.sight , "/Game/Client/Assets/Sprites/sight.png" );
        }

        create() {
            this.game.add.existing( new Playground( this.game ) );
            this.game.add.existing( new Sight( this.game ) );
        }
    }
}