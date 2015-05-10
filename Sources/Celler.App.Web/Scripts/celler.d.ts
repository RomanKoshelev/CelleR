declare module Celler.Assets {
    enum Type {
        CellBody = 0,
        CellEye = 1,
        Sight = 2,
        Home = 3,
        Food = 4,
    }
    class Sprites {
        static path: string;
        static getKey(suit: Suit, assetType: Type): string;
        static load(suit: Suit, assetType: Assets.Type): void;
    }
}
declare module Celler {
    class SuitSprite extends Phaser.Sprite {
        suit: Suit;
        constructor(game: Phaser.Game, suit: Suit, assetType: Assets.Type, size?: number);
        resize(size: number): void;
    }
}
declare module Celler {
    class Food extends SuitSprite {
        id: string;
        constructor(game: Phaser.Game, model: FoodModel);
    }
}
declare module Celler {
    class SessionManager {
        game: Phaser.Game;
        id: string;
        constructor(game: Phaser.Game);
        private fromModel(model);
        private createHomes(arr);
        private createCells(arr);
        private createSights(arr);
        private createFoods(arr);
        foods: {
            [id: string]: Food;
        };
        private addFood(model);
        private onFoodAdded(model);
        private onFoodRemoved(id);
        private onFoodsUpdated(models);
        private updateFood(food, model);
    }
}
declare module Celler {
    class PlayState extends Phaser.State {
        static background: string;
        session: SessionManager;
        constructor();
        init(): void;
        preload(): void;
        create(): void;
        update(): void;
        private preloadSprites(suit);
    }
}
declare module Celler {
    class Home extends SuitSprite {
        id: string;
        constructor(game: Phaser.Game, model: HomeModel);
    }
}
declare module Celler {
    enum Suit {
        Blue = 0,
        Red = 1,
    }
    function toSuit(str: string): Suit;
}
declare module Celler {
    class Cell extends Phaser.Group {
        id: string;
        homeId: string;
        sightId: string;
        suit: Suit;
        sightPoint: Phaser.Point;
        constructor(game: Phaser.Game, model: CellModel);
        update(): void;
        private body;
        private eye;
        private eyeRate;
        private init(model);
        private onCellMoved(id, position);
        private onSightPositionHinted(sightId, position);
        private lookAtSigtPoint();
        private calcEyeRate();
        private updateEyeSize();
    }
}
declare module Celler {
    class Sight extends SuitSprite {
        id: string;
        cellId: string;
        static minHintDistance: number;
        static shiftPerKeypoardClick: number;
        constructor(game: Phaser.Game, model: SightModel);
        update(): void;
        procKeyboard(): void;
        private onDragStop();
        private inTweening;
        private tween;
        private onSightMoved(id, position);
        private stopAnimation();
        private onAnimationCompleete();
        private toPointModel();
        private prevHintPosition;
        private serverHintSightPosition();
        private doProcKeyboard();
    }
}
declare module Celler {
    function modelToPoint(model: PointModel): Phaser.Point;
}
declare module Celler {
    class App {
        game: Phaser.Game;
        server: ServerAdapter;
        playerId: string;
        playerSuit: Suit;
        tickCount: Number;
        constructor();
        create(): void;
        private init();
        private createGame(width, height);
        private onTickCountUpdated(count);
    }
    var app: App;
    function initApp(): void;
}
declare module Celler {
    class ServerAdapter implements GameHubServer, GameHubClient {
        constructor();
        private server;
        hintSightPosition(id: string, position: PointModel): JQueryPromise<void>;
        moveCell(id: string, position: PointModel): JQueryPromise<void>;
        moveSight(id: string, position: PointModel): JQueryPromise<void>;
        getPlayerId(): JQueryPromise<string>;
        getBounds(): JQueryPromise<SizeModel>;
        getSession(): JQueryPromise<SessionModel>;
        update(): JQueryPromise<void>;
        onSightPositionHinted: Phaser.Signal;
        onCellMoved: Phaser.Signal;
        onSightMoved: Phaser.Signal;
        onStarted: Phaser.Signal;
        onFoodAdded: Phaser.Signal;
        onFoodRemoved: Phaser.Signal;
        onFoodsUpdated: Phaser.Signal;
        onTickCountUpdated: Phaser.Signal;
        private client;
        private init();
        sightPositionHinted(id: string, position: PointModel): void;
        cellMoved(id: string, position: PointModel): void;
        sightMoved(id: string, position: PointModel): void;
        foodAdded(foodModel: FoodModel): void;
        tickCountUpdated(count: number): void;
        foodRemoved(id: string): void;
        foodsUpdated(models: FoodModel[]): void;
    }
}
