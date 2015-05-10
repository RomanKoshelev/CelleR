module Celler {

    export class SessionManager {
        game: Phaser.Game;
        id: string;

        constructor( game: Phaser.Game ) {
            this.game = game;

            app.server.getSession().done( ( sesion: SessionModel ) => {
                this.fromModel( sesion );
            } );
            app.server.onFoodAdded.add( this.onFoodAdded, this );
            app.server.onFoodRemoved.add( this.onFoodRemoved, this );
            app.server.onFoodsUpdated.add( this.onFoodsUpdated, this );
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
            arr.map( model => this.addFood( model ) );
        }


        foods: { [ id: string ]: Food; } = {};

        private addFood( model: FoodModel ) {
            var food = new Food( this.game, model );
            this.foods[ food.id ] = food;
            this.game.add.existing( food );
        }

        private onFoodAdded( model: FoodModel ) {
            this.addFood( model );
        }

        private onFoodRemoved( id: string ) {
            var food = this.foods[ id ];
            this.game.world.remove( food );
            food.destroy( true );
        }

        private onFoodsUpdated( models: FoodModel[] ) {
            
            models.forEach( model => {
                this.updateFood(this.foods[model.Base.Id], model);
            } );
        }

        private updateFood( food: Food, model: FoodModel ) {
            food.resize( model.Base.Size );
        }
    }
}