/// <reference path="SuitSprite.ts"/>
module Celler {
    export class Food extends SuitSprite {

        id: string;

        static minHintDistance = 4;
        static shiftPerKeypoardClick = 10;

        constructor( game: Phaser.Game, model: FoodModel ) {
            super( game, Suit[ model.Base.Suit ], Assets.Type.Food, model.Base.Size );

            this.id = model.Base.Id;
            this.position = modelToPoint( model.Base.Position );

            this.inputEnabled = true;
            this.input.enableDrag();

            this.events.onDragStop.add( this.onDragStop, this );
            app.server.onSightMoved.add( this.onSightMoved, this );
        }

        private onSightMoved( id: string, position: PointModel ) {
        }

        private onDragStop() {
        }
    }
}