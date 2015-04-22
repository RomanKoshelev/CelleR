module Celler {
    export class GameplayState extends Phaser.State {
        constructor() {
            super();
        }

        preload() {
            this.game.load.image( Assets.Sprites.playground, "/Game/Client/Assets/Sprites/ground.png" );
            this.game.load.image( Assets.Sprites.sight , "/Game/Client/Assets/Sprites/sight.png" );
            this.game.load.image( Assets.Sprites.redBody, "/Game/Client/Assets/Sprites/red/body.png" );
            this.game.load.image( Assets.Sprites.redEye, "/Game/Client/Assets/Sprites/red/eye.png" );
        }

        create() {
            this.game.add.existing( new Playground( this.game ) );
            this.game.add.existing( new Cell( this.game, Suit.Red ) );
            this.game.add.existing( new Sight( this.game ) );
        }
    }
}