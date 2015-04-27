﻿module Celler {
    export class Cell extends Phaser.Group {

        suit: Suit;
        sight: SuitSprite;

        constructor( game: Phaser.Game, suit: Suit, size: number ) {
            super( game );
            this.init( suit, size );
            app.server.onCellMoved.add( this.onCellMoved, this );
            app.server.onSightPositionHinted.add( this.onSightPositionHinted, this );
        }

        private body: SuitSprite;
        private eye: SuitSprite;
        private eyeRate: number;

        private init( suit: Suit, size: number ) {
            this.addChild( this.body = new SuitSprite( this.game, suit, Assets.Type.CellBody ) );
            this.addChild( this.eye = new SuitSprite( this.game, suit, Assets.Type.CellEye ) );

            this.suit = suit;
            this.scale.set( size / this.width );

            this.updateEyeSize();
        }

        private onCellMoved( position: SuitPositonModel ) {
            if( Suit[ position.Suit ] === this.suit ) {
                this.jumpTo( new Phaser.Point( position.Position.X, position.Position.Y ) );
            }
        }

        private onSightPositionHinted( position: SuitPositonModel ) {
            if( Suit[ position.Suit ] === this.suit ) {
                this.lookAt( new Phaser.Point( position.Position.X, position.Position.Y ) );
            }
        }

        private lookAt( p: Phaser.Point ) {
            var r = this.width * 0.1;
            var l = Phaser.Point.distance( this.position, p );
            var c = this.width;
            var e = c * this.eyeRate;
            var d = ( c - e ) / 2;
            var m = d / this.scale.x;

            p = Phaser.Point.subtract( p, this.position );
            p = p.normalize();
            p = p.multiply( m, m );

            this.eye.position = l > r ? p : new Phaser.Point();
        }

        private calcEyeRate(): number {
            return 0.75;
        }

        private updateEyeSize() {
            this.eyeRate = this.calcEyeRate();
            this.eye.scale.set( this.eyeRate );
        }

        private jumpTo( p: Phaser.Point ) {
            this.game.add.tween( this ).to( { x: p.x, y: p.y }, 500, Phaser.Easing.Circular.InOut, true );
        }
    }
}