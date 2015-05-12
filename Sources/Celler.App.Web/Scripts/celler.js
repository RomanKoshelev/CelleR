var Celler;
(function (Celler) {
    var App = (function () {
        function App() {
            this.playerId = "";
            this.playerSuit = 0 /* Blue */;
            this.server = new Celler.ServerAdapter();
            this.server.onStarted.addOnce(this.init, this);
            this.server.onTickCountUpdated.add(this.onTickCountUpdated, this);
        }
        App.prototype.create = function () {
            this.game.state.add("Room", Celler.PlayState, true);
        };
        App.prototype.init = function () {
            var _this = this;
            this.server.getPlayerId().done(function (id) {
                _this.playerId = id;
            });
            this.server.getWorldBounds().done(function (bounds) {
                _this.createGame(bounds.Width, bounds.Height);
            });
            document.getElementById("celler-reset-session").onclick = function () {
                _this.server.resetSession();
            };
        };
        App.prototype.createGame = function (width, height) {
            this.game = new Phaser.Game(width, height, Phaser.AUTO, "celler-playground", { create: this.create });
        };
        App.prototype.onTickCountUpdated = function (count) {
            this.tickCount = count;
        };
        return App;
    })();
    Celler.App = App;
    Celler.app;
    function initApp() {
        Celler.app = new App();
    }
    Celler.initApp = initApp;
})(Celler || (Celler = {}));
window.onload = function () {
    Celler.initApp();
};
var Celler;
(function (Celler) {
    var Assets;
    (function (Assets) {
        (function (Type) {
            Type[Type["CellBody"] = 0] = "CellBody";
            Type[Type["CellEye"] = 1] = "CellEye";
            Type[Type["Sight"] = 2] = "Sight";
            Type[Type["Food"] = 3] = "Food";
            Type[Type["House"] = 4] = "House";
            Type[Type["Loot"] = 5] = "Loot";
        })(Assets.Type || (Assets.Type = {}));
        var Type = Assets.Type;
        var Sprites = (function () {
            function Sprites() {
            }
            Sprites.getKey = function (suit, assetType) {
                return "" + assetType + "-" + suit;
            };
            Sprites.load = function (suit, assetType) {
                var typeName = Type[assetType].toLowerCase();
                var suitName = Celler.Suit[suit].toLowerCase();
                Celler.app.game.load.image(Sprites.getKey(suit, assetType), "" + Sprites.path + "/" + suitName + "/" + typeName + ".png");
            };
            Sprites.path = "/Game/Client/Assets/Sprites";
            return Sprites;
        })();
        Assets.Sprites = Sprites;
    })(Assets = Celler.Assets || (Celler.Assets = {}));
})(Celler || (Celler = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(game, model) {
            _super.call(this, game);
            this.init(model);
            Celler.app.server.onCellMoved.add(this.onCellMoved, this);
            Celler.app.server.onSightPositionHinted.add(this.onSightPositionHinted, this);
        }
        Cell.prototype.update = function () {
            _super.prototype.update.call(this);
            this.lookAtSigtPoint();
        };
        Cell.prototype.init = function (model) {
            this.id = model.Base.Id;
            this.sightId = model.SightId;
            this.homeId = model.HomeId;
            this.suit = Celler.Suit[model.Base.Suit];
            this.addChild(this.body = new Celler.SuitSprite(this.game, this.suit, 0 /* CellBody */));
            this.addChild(this.eye = new Celler.SuitSprite(this.game, this.suit, 1 /* CellEye */));
            this.scale.set(model.Base.Size / this.width);
            this.position = Celler.modelToPoint(model.Base.Position);
            this.updateEyeSize();
        };
        Cell.prototype.onCellMoved = function (id, position) {
            if (this.id === id) {
                this.game.add.tween(this).to({ x: position.X, y: position.Y }, 500, Phaser.Easing.Circular.InOut, true);
            }
        };
        Cell.prototype.onSightPositionHinted = function (sightId, position) {
            if (this.sightId === sightId) {
                this.sightPoint = Celler.modelToPoint(position);
            }
        };
        Cell.prototype.lookAtSigtPoint = function () {
            if (this.sightPoint == null)
                return;
            var p = this.sightPoint.clone();
            var l = Phaser.Point.distance(this.position, p);
            var c = this.width;
            var e = c * this.eyeRate;
            var r = c * 0.1;
            var d = (c - e) / 2;
            var m = d / this.scale.x;
            p = Phaser.Point.subtract(p, this.position);
            p = p.normalize();
            p = p.multiply(m, m);
            this.eye.position = l > r ? p : new Phaser.Point();
        };
        Cell.prototype.calcEyeRate = function () {
            return 0.75;
        };
        Cell.prototype.updateEyeSize = function () {
            this.eyeRate = this.calcEyeRate();
            this.eye.scale.set(this.eyeRate);
        };
        return Cell;
    })(Phaser.Group);
    Celler.Cell = Cell;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var SuitSprite = (function (_super) {
        __extends(SuitSprite, _super);
        function SuitSprite(game, suit, assetType, size) {
            if (size === void 0) { size = 0; }
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.getKey(suit, assetType));
            this.suit = suit;
            this.anchor.set(0.5);
            if (size !== 0) {
                this.resize(size);
            }
        }
        SuitSprite.prototype.resize = function (size) {
            this.scale.set(size / this.texture.width);
        };
        return SuitSprite;
    })(Phaser.Sprite);
    Celler.SuitSprite = SuitSprite;
})(Celler || (Celler = {}));
/// <reference path="SuitSprite.ts"/>
var Celler;
(function (Celler) {
    var Food = (function (_super) {
        __extends(Food, _super);
        function Food(game, model) {
            _super.call(this, game, Celler.Suit[model.Base.Suit], 3 /* Food */, model.Base.Size);
            this.id = model.Base.Id;
            this.position = Celler.modelToPoint(model.Base.Position);
            this.size = 0;
            this.update();
        }
        Food.prototype.update = function () {
            _super.prototype.update.call(this);
            this.resize(this.size);
        };
        Food.prototype.setSize = function (size, foodUpdateInterval) {
            this.game.add.tween(this).to({ size: size }, foodUpdateInterval, Phaser.Easing.Linear.None, true);
        };
        return Food;
    })(Celler.SuitSprite);
    Celler.Food = Food;
})(Celler || (Celler = {}));
/// <reference path="SuitSprite.ts" />
var Celler;
(function (Celler) {
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home(game, model) {
            _super.call(this, game);
            this.init(model);
        }
        Home.prototype.init = function (model) {
            this.id = model.Base.Id;
            this.suit = Celler.Suit[model.Base.Suit];
            this.size = model.Base.Size;
            this.lootVolume = model.Value;
            this.lootMaxVolume = model.MaxValue;
            this.addChild(this.house = new Celler.SuitSprite(this.game, this.suit, 4 /* House */));
            this.addChild(this.loot = new Celler.SuitSprite(this.game, this.suit, 5 /* Loot */));
            this.scale.set(this.calcScale());
            this.position = Celler.modelToPoint(model.Base.Position);
            this.updateLootPresentation();
        };
        Home.prototype.updateLootPresentation = function () {
            this.loot.scale.set(this.calcLootScale());
            this.loot.position = this.calcLootPosition();
        };
        Home.prototype.calcLootScale = function () {
            var square = this.calcLootRate();
            return Math.sqrt(square);
        };
        Home.prototype.calcLootRate = function () {
            return this.lootVolume / this.lootMaxVolume;
        };
        Home.prototype.calcScale = function () {
            return this.size / this.house.texture.width;
        };
        Home.prototype.calcLootPosition = function () {
            var pos = new Phaser.Point();
            var hh = this.house.height / 2;
            var hw = this.house.width / 2;
            var lh = this.loot.height / 2;
            var lw = this.loot.width / 2;
            switch (this.suit) {
                case 0 /* Blue */:
                    pos.x = -hh + lh;
                    pos.y = hw - lw;
                    break;
                case 1 /* Red */:
                    pos.x = hh - lh;
                    pos.y = -hw + lw;
                    break;
            }
            return pos;
        };
        Home.prototype.setLoot = function (volume) {
            this.lootVolume = volume;
            this.updateLootPresentation();
        };
        return Home;
    })(Phaser.Group);
    Celler.Home = Home;
})(Celler || (Celler = {}));
/// <reference path="SuitSprite.ts"/>
var Celler;
(function (Celler) {
    var Sight = (function (_super) {
        __extends(Sight, _super);
        function Sight(game, model) {
            _super.call(this, game, Celler.Suit[model.Base.Suit], 2 /* Sight */, model.Base.Size);
            this.inTweening = false;
            this.prevHintTime = Celler.app.game.time.now;
            this.prevHintPosition = new Phaser.Point(0, 0);
            this.id = model.Base.Id;
            this.cellId = model.CellId;
            this.position = Celler.modelToPoint(model.Base.Position);
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStop.add(this.onDragStop, this);
            Celler.app.server.onSightMoved.add(this.onSightMoved, this);
        }
        Sight.prototype.update = function () {
            this.serverHintSightPosition();
            this.procKeyboard();
            _super.prototype.update.call(this);
        };
        Sight.prototype.procKeyboard = function () {
            if (this.suit === Celler.app.playerSuit) {
                this.doProcKeyboard();
            }
        };
        Sight.prototype.onDragStop = function () {
            Celler.app.server.moveSight(this.id, this.toPointModel());
            Celler.app.server.moveCell(this.cellId, this.toPointModel());
        };
        Sight.prototype.onSightMoved = function (id, position) {
            if (this.id === id) {
                this.inTweening = true;
                this.tween = this.game.add.tween(this).to({ x: position.X, y: position.Y }, 200, Phaser.Easing.Circular.InOut, true);
                this.tween.onComplete.addOnce(this.onAnimationCompleete, this);
            }
        };
        Sight.prototype.stopAnimation = function () {
            if (this.tween != null) {
                this.position = this.tween.target.position;
                this.tween.stop();
            }
        };
        Sight.prototype.onAnimationCompleete = function () {
            this.inTweening = false;
        };
        Sight.prototype.toPointModel = function () {
            return {
                X: this.position.x,
                Y: this.position.y
            };
        };
        Sight.prototype.serverHintSightPosition = function () {
            if (!this.inTweening && (Celler.app.game.time.now - this.prevHintTime) > Sight.minHintIntgerval && Phaser.Point.distance(this.prevHintPosition, this.position) > Sight.minHintDistance) {
                this.prevHintTime = Celler.app.game.time.now;
                this.prevHintPosition = this.position.clone();
                Celler.app.server.hintSightPosition(this.id, this.toPointModel());
            }
        };
        Sight.prototype.doProcKeyboard = function () {
            var keyboard = this.game.input.keyboard;
            var precisely = keyboard.isDown(Phaser.Keyboard.SHIFT);
            var distance = Sight.shiftPerKeypoardClick * (precisely ? 0.2 : 1);
            if (keyboard.isDown(Phaser.Keyboard.UP)) {
                this.position.y -= distance;
            }
            if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.position.y += distance;
            }
            if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.position.x -= distance;
            }
            if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.position.x += distance;
            }
            if (keyboard.isDown(Phaser.Keyboard.ENTER) || keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                Celler.app.server.moveSight(this.id, this.toPointModel());
                Celler.app.server.moveCell(this.cellId, this.toPointModel());
            }
        };
        Sight.minHintIntgerval = 100;
        Sight.minHintDistance = 4;
        Sight.shiftPerKeypoardClick = 10;
        return Sight;
    })(Celler.SuitSprite);
    Celler.Sight = Sight;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    (function (Suit) {
        Suit[Suit["Blue"] = 0] = "Blue";
        Suit[Suit["Red"] = 1] = "Red";
    })(Celler.Suit || (Celler.Suit = {}));
    var Suit = Celler.Suit;
    function toSuit(str) {
        return Suit[str];
    }
    Celler.toSuit = toSuit;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var SessionManager = (function () {
        function SessionManager(game) {
            var _this = this;
            this.cells = {};
            this.sights = {};
            this.foods = {};
            this.homes = {};
            this.game = game;
            Celler.app.server.getSession().done(function (model) {
                _this.fromModel(model);
            });
            Celler.app.server.onFoodAdded.add(this.onFoodAdded, this);
            Celler.app.server.onFoodRemoved.add(this.onFoodRemoved, this);
            Celler.app.server.onFoodsUpdated.add(this.onFoodsUpdated, this);
            Celler.app.server.onHomesUpdated.add(this.onHomesUpdated, this);
            Celler.app.server.onSessionUpdated.add(this.onSessionUpdated, this);
        }
        SessionManager.prototype.createLevels = function () {
            this.homeLevel = this.game.add.group();
            this.foodLevel = this.game.add.group();
            this.cellLevel = this.game.add.group();
            this.sightLevel = this.game.add.group();
        };
        SessionManager.prototype.destroyLevels = function () {
            this.homeLevel.destroy();
            this.foodLevel.destroy();
            this.cellLevel.destroy();
            this.sightLevel.destroy();
        };
        SessionManager.prototype.fromModel = function (model) {
            this.id = model.Id;
            this.serverUpdateInterval = model.UpdateInterval;
            this.createLevels();
            this.createHomes(model.Homes);
            this.createCells(model.Cells);
            this.createSights(model.Sights);
            this.createFoods(model.Foods);
        };
        SessionManager.prototype.onSessionUpdated = function (model) {
            this.destroyAll();
            this.fromModel(model);
        };
        SessionManager.prototype.destroyAll = function () {
            this.destroyLevels();
        };
        SessionManager.prototype.onFoodAdded = function (model) {
            this.addFood(model);
        };
        SessionManager.prototype.onFoodRemoved = function (id) {
            var food = this.foods[id];
            food.destroy(true);
        };
        SessionManager.prototype.onFoodsUpdated = function (models) {
            var _this = this;
            models.forEach(function (model) {
                _this.updateFood(_this.foods[model.Base.Id], model);
            });
        };
        SessionManager.prototype.updateFood = function (food, model) {
            food.setSize(model.Base.Size, this.serverUpdateInterval);
        };
        SessionManager.prototype.onHomesUpdated = function (models) {
            var _this = this;
            models.forEach(function (model) {
                _this.updateHome(_this.homes[model.Base.Id], model);
            });
        };
        SessionManager.prototype.updateHome = function (home, model) {
            home.setLoot(model.Value);
        };
        SessionManager.prototype.createHomes = function (arr) {
            var _this = this;
            arr.map(function (model) { return _this.addHome(model); });
        };
        SessionManager.prototype.createCells = function (arr) {
            var _this = this;
            arr.map(function (model) { return _this.addCell(model); });
        };
        SessionManager.prototype.createSights = function (arr) {
            var _this = this;
            arr.map(function (model) { return _this.addSight(model); });
        };
        SessionManager.prototype.createFoods = function (arr) {
            var _this = this;
            arr.map(function (model) { return _this.addFood(model); });
        };
        SessionManager.prototype.addHome = function (model) {
            var home = new Celler.Home(this.game, model);
            this.homes[home.id] = home;
            this.homeLevel.add(home);
        };
        SessionManager.prototype.addFood = function (model) {
            var food = new Celler.Food(this.game, model);
            this.foods[food.id] = food;
            this.foodLevel.add(food);
        };
        SessionManager.prototype.addSight = function (model) {
            var sight = new Celler.Sight(this.game, model);
            this.sights[sight.id] = sight;
            this.sightLevel.add(sight);
        };
        SessionManager.prototype.addCell = function (model) {
            var cell = new Celler.Cell(this.game, model);
            this.cells[cell.id] = cell;
            this.cellLevel.add(cell);
        };
        return SessionManager;
    })();
    Celler.SessionManager = SessionManager;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var ServerAdapter = (function () {
        function ServerAdapter() {
            // --------------------------------------------------------[]
            // Server
            this.server = $.connection.gameHub.server;
            // --------------------------------------------------------[]
            // Client
            this.onSightPositionHinted = new Phaser.Signal();
            this.onCellMoved = new Phaser.Signal();
            this.onSightMoved = new Phaser.Signal();
            this.onStarted = new Phaser.Signal();
            this.onFoodAdded = new Phaser.Signal();
            this.onFoodRemoved = new Phaser.Signal();
            this.onFoodsUpdated = new Phaser.Signal();
            this.onHomesUpdated = new Phaser.Signal();
            this.onSessionUpdated = new Phaser.Signal();
            this.onTickCountUpdated = new Phaser.Signal();
            this.client = $.connection.gameHub.client;
            this.init();
        }
        ServerAdapter.prototype.hintSightPosition = function (id, position) {
            return this.server.hintSightPosition(id, position);
        };
        ServerAdapter.prototype.moveCell = function (id, position) {
            return this.server.moveCell(id, position);
        };
        ServerAdapter.prototype.moveSight = function (id, position) {
            return this.server.moveSight(id, position);
        };
        ServerAdapter.prototype.getPlayerId = function () {
            return this.server.getPlayerId();
        };
        ServerAdapter.prototype.getWorldBounds = function () {
            return this.server.getWorldBounds();
        };
        ServerAdapter.prototype.getSession = function () {
            return this.server.getSession();
        };
        ServerAdapter.prototype.update = function () {
            return this.server.update();
        };
        ServerAdapter.prototype.resetSession = function () {
            return this.server.resetSession();
        };
        ServerAdapter.prototype.init = function () {
            this.setupClientCallbacks();
            this.startHub();
        };
        ServerAdapter.prototype.startHub = function () {
            var _this = this;
            $.connection.hub.start().done(function () {
                _this.onStarted.dispatch();
            });
        };
        ServerAdapter.prototype.setupClientCallbacks = function () {
            var _this = this;
            this.client.sightPositionHinted = function (id, position) {
                _this.sightPositionHinted(id, position);
            };
            this.client.cellMoved = function (id, position) {
                _this.cellMoved(id, position);
            };
            this.client.sightMoved = function (id, position) {
                _this.sightMoved(id, position);
            };
            this.client.foodAdded = function (food) {
                _this.foodAdded(food);
            };
            this.client.foodRemoved = function (id) {
                _this.foodRemoved(id);
            };
            this.client.foodsUpdated = function (models) {
                _this.foodsUpdated(models);
            };
            this.client.homesUpdated = function (models) {
                _this.homesUpdated(models);
            };
            this.client.tickCountUpdated = function (count) {
                _this.tickCountUpdated(count);
            };
            this.client.sessionUpdated = function (model) {
                _this.sessionUpdated(model);
            };
        };
        ServerAdapter.prototype.sightPositionHinted = function (id, position) {
            this.onSightPositionHinted.dispatch(id, position);
        };
        ServerAdapter.prototype.cellMoved = function (id, position) {
            this.onCellMoved.dispatch(id, position);
        };
        ServerAdapter.prototype.sightMoved = function (id, position) {
            this.onSightMoved.dispatch(id, position);
        };
        ServerAdapter.prototype.foodAdded = function (foodModel) {
            this.onFoodAdded.dispatch(foodModel);
        };
        ServerAdapter.prototype.tickCountUpdated = function (count) {
            this.onTickCountUpdated.dispatch(count);
        };
        ServerAdapter.prototype.foodRemoved = function (id) {
            this.onFoodRemoved.dispatch(id);
        };
        ServerAdapter.prototype.foodsUpdated = function (models) {
            this.onFoodsUpdated.dispatch(models);
        };
        ServerAdapter.prototype.homesUpdated = function (models) {
            this.onHomesUpdated.dispatch(models);
        };
        ServerAdapter.prototype.sessionUpdated = function (model) {
            this.onSessionUpdated.dispatch(model);
        };
        return ServerAdapter;
    })();
    Celler.ServerAdapter = ServerAdapter;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            _super.call(this);
        }
        PlayState.prototype.init = function () {
            this.game.stage.backgroundColor = PlayState.background;
        };
        PlayState.prototype.preload = function () {
            this.preloadSprites(0 /* Blue */);
            this.preloadSprites(1 /* Red */);
        };
        PlayState.prototype.create = function () {
            this.session = new Celler.SessionManager(this.game);
        };
        PlayState.prototype.update = function () {
            this.game.debug.text("" + this.session.id + " [" + Celler.app.tickCount + "]", 10, 20);
        };
        PlayState.prototype.preloadSprites = function (suit) {
            Celler.Assets.Sprites.load(suit, 4 /* House */);
            Celler.Assets.Sprites.load(suit, 5 /* Loot */);
            Celler.Assets.Sprites.load(suit, 0 /* CellBody */);
            Celler.Assets.Sprites.load(suit, 1 /* CellEye */);
            Celler.Assets.Sprites.load(suit, 2 /* Sight */);
            Celler.Assets.Sprites.load(suit, 3 /* Food */);
        };
        PlayState.background = "#004400";
        return PlayState;
    })(Phaser.State);
    Celler.PlayState = PlayState;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    function modelToPoint(model) {
        return new Phaser.Point(model.X, model.Y);
    }
    Celler.modelToPoint = modelToPoint;
})(Celler || (Celler = {}));
//# sourceMappingURL=celler.js.map