module Celler {

    export class Session {
        game: Phaser.Game;

        constructor( game: Phaser.Game ) {
            this.game = game;

            app.server.getSession().done( ( sesion: SessionModel ) => {
                this.createObjects( sesion );
            } );
        }

        // Code: createObjects ( model: SessionModel ) 
        private createObjects( model: SessionModel ) {
            this.createCells( model.Cells );
        }


        private xxxCreateObjects( suit: Suit ) {
            var sight = new Sight( this.game, suit, PlayState.sightSize );
            var home = new Home( this.game, suit, PlayState.homeSize );
            var cell = new Cell( this.game, suit, PlayState.cellSize );

            this.game.add.existing( home );
            this.game.add.existing( sight );
            this.game.add.existing( cell );

//            home.position = this.getCornerCoords( suit, home.width / 2 );
            cell.position = home.position.clone();
            sight.position = cell.position.clone();

            this.game.world.sendToBack( sight );
            this.game.world.sendToBack( cell );
            this.game.world.sendToBack( home );

        }


        private createCells( cells: CellModel[] ) {
            cells.map( model => {
                var cell = new Cell( this.game, Suit[ model.Base.Suit ], PlayState.cellSize );
                cell.position = toPoint( model.Base.Position );
                this.game.add.existing( cell );
            } );
            
        }
    }
}