/// <reference path="SuitSprite.ts"/>
module Celler {
    export class Home extends SuitSprite {

        id: string;

        constructor( game: Phaser.Game, model: HomeModel ) {
            super( game, Suit[ model.Base.Suit ], Assets.Type.Home, model.Base.Size );

            this.id = model.Base.Id;
            this.position = modelToPoint( model.Base.Position );
        }
    }
}