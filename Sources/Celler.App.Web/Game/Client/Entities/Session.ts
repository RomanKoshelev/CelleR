module Celler {

    export class Session {
        game: Phaser.Game;
        room: PlayState;
        sights = [];

        constructor( room: PlayState ) {
            this.room = room;
            this.game = room.game;

            app.server.getSession().done( ( sesion: SessionModel ) => {
                this.createObjects( sesion );
            } );
        }

        // Code: createObjects ( model: SessionModel ) 
        private createObjects( model: SessionModel ) {
            model.Cells.map( cm => {
                var suit = Suit[ cm.SuitObject.Suit ];
                var cell = new Cell( this.game, suit, PlayState.cellSize );
                this.game.add.existing( cell );
                cell.position = this.getCornerCoords( suit, cell.width );
            } );
        }


        private xxxCreateObjects( suit: Suit ) {
            var sight = new Sight( this.game, suit, PlayState.sightSize );
            var home = new Home( this.game, suit, PlayState.homeSize );
            var cell = new Cell( this.game, suit, PlayState.cellSize );

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
            throw new Error( `Unsupported suit [${Suit[ suit ]}]` );
        }
    }
}