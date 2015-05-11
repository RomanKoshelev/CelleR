/// <reference path="SuitSprite.ts"/>
module Celler {
    export class Food extends SuitSprite {

        id: string;
        size: number;

        constructor( game: Phaser.Game, model: FoodModel ) {
            super( game, Suit[ model.Base.Suit ], Assets.Type.Food, model.Base.Size );

            this.id = model.Base.Id;
            this.position = modelToPoint( model.Base.Position );
            this.size = 0;
            this.update();
        }

        update() {
            super.update();
            this.resize( this.size );
        }

        setSize( size: number, foodUpdateInterval: number ) {
            this.game.add
                .tween( this )
                .to( { size: size }, foodUpdateInterval, Phaser.Easing.Linear.None, true );

        }
    }
}