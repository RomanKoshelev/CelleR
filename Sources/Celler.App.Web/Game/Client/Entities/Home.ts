/// <reference path="SuitSprite.ts" />
module Celler {
    export class Home extends Phaser.Group {

        id: string;
        suit: Suit;
        lootVolume : number;
        lootMaxVolume : number;
        size: number;

        constructor( game: Phaser.Game, model: HomeModel ) {
            super( game );
            this.init( model );
        }

        private house: SuitSprite;
        private loot: SuitSprite;

        private init( model: HomeModel ) {

            this.id = model.Base.Id;
            this.suit = Suit[ model.Base.Suit ];
            this.size = model.Base.Size;
            this.lootVolume = model.Value;
            this.lootMaxVolume = model.MaxValue;

            this.addChild( this.house = new SuitSprite( this.game, this.suit, Assets.Type.House ) );
            this.addChild( this.loot = new SuitSprite( this.game, this.suit, Assets.Type.Loot ) );

            this.scale.set( this.calcScale() );
            this.position = modelToPoint( model.Base.Position );

            this.updateLootPresentation();
        }

        private updateLootPresentation() {
            this.loot.scale.set( this.calcLootScale() );
            this.loot.position = this.calcLootPosition();
        }


        private calcLootScale(): number {
            var square = this.calcLootRate();
            return Math.sqrt( square );
        }

        private calcLootRate(): number {
            return this.lootVolume / this.lootMaxVolume;
        }

        private calcScale(): number {
            return this.size / this.house.texture.width;
        }

        private calcLootPosition(): Phaser.Point {
            var pos = new Phaser.Point();
            var hh = this.house.height / 2;
            var hw = this.house.width / 2;
            var lh = this.loot.height / 2;
            var lw = this.loot.width / 2;
            switch( this.suit ) {
            case Suit.Blue:
                pos.x = -hh + lh;
                pos.y = hw - lw;
                break;
            case Suit.Red:
                pos.x = hh - lh;
                pos.y = -hw + lw;
                break;
            }

            return pos;
        }

        setLoot( volume: number ) {
            this.lootVolume = volume;
            this.updateLootPresentation();
        }
    }
}