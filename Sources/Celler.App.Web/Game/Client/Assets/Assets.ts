module Celler {
    export module Assets {
        export enum Type {
            Playground,
            CellBody,
            CellEye,
            Sight
        }

        export class Sprites {
            static path = "/Game/Client/Assets/Sprites";

            static getSpriteKey( suit: Suit, assetType: Type ): string {
                return `${assetType}-${suit}`;
            }
        }
    }
}