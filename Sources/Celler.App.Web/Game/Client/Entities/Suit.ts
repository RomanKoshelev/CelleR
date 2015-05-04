module Celler {
    export enum Suit {
        Blue,
        Red
    }
    export function toSuit ( str: string ): Suit 
    {
        return Suit [str];
    }
}