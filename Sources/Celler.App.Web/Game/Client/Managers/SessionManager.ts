module Celler {

    export class SessionManager {
        game: Phaser.Game;
        id: string;
        foodLevel: Phaser.Group;
        homeLevel: Phaser.Group;
        cellLevel: Phaser.Group;
        sightLevel: Phaser.Group;

        constructor( game: Phaser.Game ) {
            this.game = game;

            app.server.getSession().done( ( sesion: SessionModel ) => {
                this.fromModel( sesion );
            });

            this.homeLevel = this.game.add.group();
            this.foodLevel = this.game.add.group();
            this.cellLevel = this.game.add.group();
            this.sightLevel = this.game.add.group();

            app.server.onFoodAdded.add( this.onFoodAdded, this );
            app.server.onFoodRemoved.add( this.onFoodRemoved, this );
            app.server.onFoodsUpdated.add( this.onFoodsUpdated, this );
            app.server.onHomesUpdated.add( this.onHomesUpdated, this );
        }

        private serverUpdateInterval: number;
        private cells: { [ id: string ]: Cell; } = {};
        private sights: { [ id: string ]: Sight; } = {};
        private foods: { [ id: string ]: Food; } = {};
        private homes: { [ id: string ]: Home; } = {};

        private fromModel( model: SessionModel ) {
            this.id = model.Id;
            this.serverUpdateInterval = model.UpdateInterval;
            this.createHomes( model.Homes );
            this.createCells( model.Cells );
            this.createSights( model.Sights );
            this.createFoods( model.Foods );
        }

        private onFoodAdded( model: FoodModel ) {
            this.addFood( model );
        }

        private onFoodRemoved( id: string ) {
            var food = this.foods[ id ];
            food.destroy( true );
        }

        private onFoodsUpdated( models: FoodModel[] ) {

            models.forEach( model => {
                this.updateFood( this.foods[ model.Base.Id ], model );
            } );
        }

        private updateFood( food: Food, model: FoodModel ) {
            food.setSize( model.Base.Size, this.serverUpdateInterval );
        }

        private onHomesUpdated( models: HomeModel[] ) {

            models.forEach( model => {
                this.updateHome( this.homes[ model.Base.Id ], model );
            } );
        }

        private updateHome( home: Home, model: HomeModel ) {
            home.setLoot( model.Value );
        }

        private createHomes( arr: HomeModel[] ) {
            arr.map( model => this.addHome( model ) );
        }

        private createCells( arr: CellModel[] ) {
            arr.map( model => this.addCell( model ) );
        }

        private createSights( arr: SightModel[] ) {
            arr.map( model => this.addSight( model ) );
        }

        private createFoods( arr: FoodModel[] ) {
            arr.map( model => this.addFood( model ) );
        }

        private addHome( model: HomeModel ) {
            var home = new Home( this.game, model );
            this.homes[ home.id ] = home;
            this.homeLevel.add( home );
        }

        private addFood( model: FoodModel ) {
            var food = new Food( this.game, model );
            this.foods[food.id] = food;
            this.foodLevel.add( food );
        }

        private addSight( model: SightModel ) {
            var sight = new Sight( this.game, model );
            this.sights[ sight.id ] = sight;
            this.sightLevel.add( sight );
        }

        private addCell( model: CellModel ) {
            var cell = new Cell( this.game, model );
            this.cells[ cell.id ] = cell;
            this.cellLevel.add( cell );
        }
    }
}