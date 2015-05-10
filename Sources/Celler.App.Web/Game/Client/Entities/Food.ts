/// <reference path="SuitSprite.ts"/>
module Celler {
    export class Food extends SuitSprite {

        id: string;

        constructor( game: Phaser.Game, model: FoodModel ) {
            super( game, Suit[ model.Base.Suit ], Assets.Type.Food, model.Base.Size );

            this.id = model.Base.Id;
            this.position = modelToPoint( model.Base.Position );
        }

        setSize( size: number ) {
            this.resize( size );
            // Todo:> Animate!
        }
    }
}