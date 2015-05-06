module Celler {

    export class SessionManager {
        game: Phaser.Game;
        id: string;

        constructor( game: Phaser.Game ) {
            this.game = game;

            app.server.getSession().done( ( sesion: SessionModel ) => {
                this.fromModel( sesion );
            });
            app.server.onFoodAdded.add( this.onFoodAdded, this );
        }

        private fromModel( model: SessionModel ) {
            this.id = model.Id;
            this.createHomes( model.Homes );
            this.createCells( model.Cells );
            this.createSights( model.Sights );
            this.createFoods( model.Foods );
        }

        private createHomes( arr: HomeModel[] ) {
            arr.map( model => { this.game.add.existing( new Home( this.game, model ) ); } );
        }

        private createCells( arr: CellModel[] ) {
            arr.map( model => { this.game.add.existing( new Cell( this.game, model ) ); } );
        }

        private createSights( arr: SightModel[] ) {
            arr.map( model => { this.game.add.existing( new Sight( this.game, model ) ); } );
        }

        private createFoods( arr: FoodModel[] ) {
            arr.map( model => { this.game.add.existing( new Food( this.game, model ) ); } );
        }

        private onFoodAdded( model: FoodModel ) {
            this.game.add.existing( new Food( this.game, model ) );
        }
    }
}