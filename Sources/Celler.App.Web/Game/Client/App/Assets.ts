module Celler.Assets {

    export enum Type {
        CellBody,
        CellEye,
        Sight,
        Home
    }

    export class Sprites {
        static path = "/Game/Client/Assets/Sprites";

        static getKey( suit: Suit, assetType: Type ): string {
            return `${assetType}-${suit}`;
        }

        static load( suit: Suit, assetType: Assets.Type ) {
            var typeName = Type[ assetType ].toLowerCase();
            var suitName = Suit[ suit ].toLowerCase();
            app.game.load.image(
                Sprites.getKey( suit, assetType ),
                `${Sprites.path}/${suitName}/${typeName}.png` );
        }
    }
}