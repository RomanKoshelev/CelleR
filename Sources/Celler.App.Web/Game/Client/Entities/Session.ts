module Celler {

    export class Session {
        game: Phaser.Game;

        constructor( game: Phaser.Game ) {
            this.game = game;

            app.server.getSession().done( ( sesion: SessionModel ) => {
                this.createObjects( sesion );
            } );
        }

        private createObjects( model: SessionModel ) {
            this.createHomes( model.Homes );
            this.createCells( model.Cells );
            this.createSights( model.Sights );
        }

        private createHomes( arr: HomeModel[] ) {
            arr.map( model => {
                this.createAtPosition<Home>( new Home( this.game, Suit[ model.Base.Suit ], model.Base.Size ), model.Base.Position );
            } );
        }

        private createCells( arr: CellModel[] ) {
            arr.map( model => {
                this.createAtPosition<Cell>( new Cell( this.game, Suit[ model.Base.Suit ], model.Base.Size ), model.Base.Position );
            } );
        }

        private createSights( arr: SightModel[] ) {
            arr.map( model => {
                this.createAtPosition<Sight>( new Sight( this.game, Suit[ model.Base.Suit ], model.Base.Size ), model.Base.Position );
            } );
        }

        private createAtPosition<T extends PIXI.DisplayObject>( obj: T, position: PointModel ) {
            obj.position = modelToPoint( position );
            this.game.add.existing( obj );
        }
    }
}