module Celler.Assets {

    export enum Type {
        CellBody,
        CellEye,
        Sight,
        Home
    }

    export class Sprites {
        static path = "/Game/Client/Assets/Sprites";

        static getSpriteKey( suit: Suit, assetType: Type ): string {
            return `${assetType}-${suit}`;
        }
    }
}
