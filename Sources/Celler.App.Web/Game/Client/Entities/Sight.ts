module Celler {
    export class Sight extends SuitSprite {

        static minHintDistance = 4;
        static shiftPerKeypoardClick = 10;


        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game, suit, Assets.Type.Sight, size );

            this.inputEnabled = true;
            this.input.enableDrag();

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
            app.server.moveSight( this.toSuitPositionModel() );
            app.server.moveCell( this.toSuitPositionModel() );
        }

        private inTweening = false;
        private tween : Phaser.Tween;

        private onSightMoved( position: SuitPointModel ) {
            if( Suit[ position.Suit ] === this.suit ) {
                this.inTweening = true;
                this.tween = this.game.add.tween( this )
                    .to( { x: position.Point.X, y: position.Point.Y }, 200, Phaser.Easing.Circular.InOut, true );
                this.tween.onComplete.addOnce( this.onAnimationCompleete, this );
            }
        }

        private stopAnimation() {
            if ( this.tween != null ) {
                this.position = this.tween.target.position;
                this.tween.stop();
            }
        }

        private onAnimationCompleete() {
            this.inTweening = false;
        }

        private toSuitPositionModel(): SuitPointModel {
            return {
                Suit: Suit[ this.suit ],
                Point: {
                    X: this.position.x,
                    Y: this.position.y
                }
            };
        }

        private prevHintPosition = new Phaser.Point( 0, 0 );

        private serverHintSightPosition() {
            if( !this.inTweening && this.position.distance( this.prevHintPosition ) > Sight.minHintDistance ) {
                this.prevHintPosition = this.position.clone();
                app.server.hintSightPosition( this.toSuitPositionModel() );
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
                app.server.moveSight( this.toSuitPositionModel() );
                app.server.moveCell( this.toSuitPositionModel() );
            }
        }
    }
}