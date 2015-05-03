module Celler {

    export class Session {
        game: Phaser.Game;
        room: Room;
        sights = [];

        constructor( room: Room ) {
            this.room = room;
            this.game = room.game;

            app.server.getSession().done( ( sesion: SessionModel ) => {
                this.createObjects( sesion );
            } );
        }

        private createObjects( model: SessionModel ) {
            for( var c in model.Cells ) {
                var suit: Suit;
                suit = Suit[""];
                var cell = new Cell( this.game, suit, Room.cellSize );
                this.game.add.existing( cell );
            }
        }


        private xxxCreateObjects( suit: Suit ) {
            var sight = new Sight( this.game, suit, Room.sightSize );
            var home = new Home( this.game, suit, Room.homeSize );
            var cell = new Cell( this.game, suit, Room.cellSize );

            this.game.add.existing( home );
            this.game.add.existing( sight );
            this.game.add.existing( cell );

            home.position = this.getCornerCoords( suit, home.width / 2 );
            cell.position = home.position.clone();
            sight.position = cell.position.clone();

            this.game.world.sendToBack( sight );
            this.game.world.sendToBack( cell );
            this.game.world.sendToBack( home );

            this.sights[ suit ] = sight;
        }

        private getCornerCoords( suit: Suit, margin: number ): Phaser.Point {
            switch( suit ) {
            case Suit.Blue:
                return new Phaser.Point( margin, this.game.world.width - margin );
            case Suit.Red:
                return new Phaser.Point( this.game.world.width - margin, margin );
            }
            throw new Error( `Unsupported suit ${Suit[ suit ]}` );
        }
    }
}