module Celler {
    export class Sight extends SuitSprite {

        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game, suit, Assets.Type.Sight, size );
            this.init();
            app.server.onSightCoordsUpdated.add( this.onSightCoordsUpdated, this );
        }

        update() {
            this.doUpdate();
            super.update();
        }

        private init() {
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStart.add( this.onDragStart, this );
            this.events.onDragStop.add( this.onDragStop, this );
        }

        private prevUpdatePosition = new Phaser.Point( 0, 0 );

        private doUpdate() {
            if( this.position.distance( this.prevUpdatePosition ) > 0 ) {
                this.prevUpdatePosition = this.position.clone();
                app.server.updateSightCoords( this.toSightModel() );
            }
        }

        private onDragStart() {
            this.inDragMode = true;
            app.server.moveCell( Suit[this.suit], this.toPointModel() );
        }

        private onDragStop() {
            this.inDragMode = false;
            app.server.moveCell( Suit[this.suit], this.toPointModel() );
        }

        private toSightModel(): SightModel {
            return {
                Suit: Suit[ this.suit ],
                Position: this.toPointModel()
            };
        }

        private toPointModel(): PointModel {
            return {
                X: this.position.x,
                Y: this.position.y
            };
        }

        private onSightCoordsUpdated( model: SightModel ) {
            if( Suit[ model.Suit ] === this.suit && !this.inDragMode ) {
                this.position = new Phaser.Point( model.Position.X, model.Position.Y );
            }
        }

        private inDragMode: boolean;
    }
}