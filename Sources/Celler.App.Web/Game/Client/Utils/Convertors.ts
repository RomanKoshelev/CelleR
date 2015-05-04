module Celler {

    export function toPoint( model: PointModel ): Phaser.Point {
        return new Phaser.Point( model.X, model.Y );
    }
}