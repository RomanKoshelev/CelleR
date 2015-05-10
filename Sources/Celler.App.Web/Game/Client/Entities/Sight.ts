/// <reference path="SuitSprite.ts"/>
module Celler {
    export class Sight extends SuitSprite {

        id: string;
        cellId: string;

        static minHintDistance = 4;
        static shiftPerKeypoardClick = 10;

        constructor( game: Phaser.Game, model: SightModel ) {
            super( game, Suit[ model.Base.Suit ], Assets.Type.Sight, model.Base.Size );

            this.id = model.Base.Id;
            this.cellId = model.CellId;
            this.position = modelToPoint( model.Base.Position );

            this.inputEnabled = true;
            this.input.enableDrag();

            this.events.onDragStop.add( this.onDragStop, this );
            app.server.onSightMoved.add( this.onSightMoved, this );
        }

        update() {
            this.serverHintSightPosition();
            this.procKeyboard();
            super.update();
        }

        procKeyboard() {
            if( this.suit === app.playerSuit ) {
                this.doProcKeyboard();
            }
        }

        private onDragStop() {
            app.server.moveSight( this.id, this.toPointModel() );
            app.server.moveCell( this.cellId, this.toPointModel() );
        }

        private inTweening = false;
        private tween: Phaser.Tween;

        private onSightMoved( id: string, position: PointModel ) {
            if( this.id === id ) {
                this.inTweening = true;
                this.tween = this.game.add.tween( this )
                    .to( { x: position.X, y: position.Y }, 200, Phaser.Easing.Circular.InOut, true );
                this.tween.onComplete.addOnce( this.onAnimationCompleete, this );
            }
        }

        private stopAnimation() {
            if( this.tween != null ) {
                this.position = this.tween.target.position;
                this.tween.stop();
            }
        }

        private onAnimationCompleete() {
            this.inTweening = false;
        }

        private toPointModel(): PointModel {
            return {
                X: this.position.x,
                Y: this.position.y
            };
        }

        private prevHintPosition = new Phaser.Point( 0, 0 );

        private serverHintSightPosition() {
            if( !this.inTweening && this.position.distance( this.prevHintPosition ) > Sight.minHintDistance ) {
                this.prevHintPosition = this.position.clone();
                app.server.hintSightPosition( this.id, this.toPointModel() );
            }
        }

        private doProcKeyboard() {
            var keyboard = this.game.input.keyboard;
            var precisely = keyboard.isDown( Phaser.Keyboard.SHIFT );
            var distance = Sight.shiftPerKeypoardClick * ( precisely ? 0.2 : 1 );

            if( keyboard.isDown( Phaser.Keyboard.UP ) ) {
                this.position.y -= distance;
            }
            if( keyboard.isDown( Phaser.Keyboard.DOWN ) ) {
                this.position.y += distance;
            }
            if( keyboard.isDown( Phaser.Keyboard.LEFT ) ) {
                this.position.x -= distance;
            }
            if( keyboard.isDown( Phaser.Keyboard.RIGHT ) ) {
                this.position.x += distance;
            }

            if( keyboard.isDown( Phaser.Keyboard.ENTER ) || keyboard.isDown( Phaser.Keyboard.SPACEBAR ) ) {
                app.server.moveSight( this.id, this.toPointModel() );
                app.server.moveCell( this.cellId, this.toPointModel() );
            }
        }
    }
}