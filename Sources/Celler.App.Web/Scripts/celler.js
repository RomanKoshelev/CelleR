var Celler;
(function (Celler) {
    var Assets;
    (function (Assets) {
        (function (Type) {
            Type[Type["CellBody"] = 0] = "CellBody";
            Type[Type["CellEye"] = 1] = "CellEye";
            Type[Type["Sight"] = 2] = "Sight";
            Type[Type["Home"] = 3] = "Home";
        })(Assets.Type || (Assets.Type = {}));
        var Type = Assets.Type;
        var Sprites = (function () {
            function Sprites() {
            }
            Sprites.getSpriteKey = function (suit, assetType) {
                return "" + assetType + "-" + suit;
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
    var SuitSprite = (function (_super) {
        __extends(SuitSprite, _super);
        function SuitSprite(game, suit, assetType, size) {
            if (size === void 0) { size = 0; }
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.getSpriteKey(suit, assetType));
            this.suit = suit;
            this.anchor.set(0.5);
            if (size !== 0) {
                this.scale.set(size / this.width);
            }
        }
        return SuitSprite;
    })(Phaser.Sprite);
    Celler.SuitSprite = SuitSprite;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home(game, suit, size) {
            _super.call(this, game, suit, 3 /* Home */, size);
        }
        return Home;
    })(Celler.SuitSprite);
    Celler.Home = Home;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    (function (Suit) {
        Suit[Suit["Blue"] = 0] = "Blue";
        Suit[Suit["Red"] = 1] = "Red";
    })(Celler.Suit || (Celler.Suit = {}));
    var Suit = Celler.Suit;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(game, suit, size) {
            _super.call(this, game);
            this.init(suit, size);
            Celler.app.server.onCellCoordsUpdated.add(this.onCellCoordsUpdated, this);
        }
        Cell.prototype.update = function () {
            this.lookAt(this.sight.position);
            _super.prototype.update.call(this);
        };
        Cell.prototype.init = function (suit, size) {
            this.addChild(this.body = new Celler.SuitSprite(this.game, suit, 0 /* CellBody */));
            this.addChild(this.eye = new Celler.SuitSprite(this.game, suit, 1 /* CellEye */));
            this.suit = suit;
            this.scale.set(size / this.width);
            this.updateEyeSize();
        };
        Cell.prototype.onCellCoordsUpdated = function (model) {
            if (Celler.Suit[model.Suit] === this.suit) {
                this.jumpTo(new Phaser.Point(model.Position.X, model.Position.Y));
            }
        };
        Cell.prototype.lookAt = function (p) {
            var r = this.width * 0.1;
            var l = Phaser.Point.distance(this.position, p);
            var c = this.width;
            var e = c * this.eyeRate;
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
        Cell.prototype.jumpTo = function (p) {
            var tween = this.game.add.tween(this).to({ x: p.x, y: p.y }, 1000, Phaser.Easing.Cubic.InOut, true);
        };
        return Cell;
    })(Phaser.Group);
    Celler.Cell = Cell;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Sight = (function (_super) {
        __extends(Sight, _super);
        function Sight(game, suit, size) {
            _super.call(this, game, suit, 2 /* Sight */, size);
            this.prevUpdatePosition = new Phaser.Point(0, 0);
            this.init();
            Celler.app.server.onSightCoordsUpdated.add(this.onSightCoordsUpdated, this);
        }
        Sight.prototype.update = function () {
            this.doUpdate();
            _super.prototype.update.call(this);
        };
        Sight.prototype.init = function () {
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStart.add(this.onDragStart, this);
            this.events.onDragStop.add(this.onDragStop, this);
        };
        Sight.prototype.doUpdate = function () {
            if (this.position.distance(this.prevUpdatePosition) > 0) {
                this.prevUpdatePosition = this.position.clone();
                Celler.app.server.updateSightCoords(this.toSightModel());
            }
        };
        Sight.prototype.onDragStart = function () {
            this.inDragMode = true;
            Celler.app.server.moveCell(Celler.Suit[this.suit], this.toPointModel());
        };
        Sight.prototype.onDragStop = function () {
            this.inDragMode = false;
            Celler.app.server.moveCell(Celler.Suit[this.suit], this.toPointModel());
        };
        Sight.prototype.toSightModel = function () {
            return {
                Suit: Celler.Suit[this.suit],
                Position: this.toPointModel()
            };
        };
        Sight.prototype.toPointModel = function () {
            return {
                X: this.position.x,
                Y: this.position.y
            };
        };
        Sight.prototype.onSightCoordsUpdated = function (model) {
            if (Celler.Suit[model.Suit] === this.suit && !this.inDragMode) {
                this.position = new Phaser.Point(model.Position.X, model.Position.Y);
            }
        };
        return Sight;
    })(Celler.SuitSprite);
    Celler.Sight = Sight;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            _super.call(this);
        }
        PlayState.prototype.init = function () {
            this.game.stage.backgroundColor = "#004400";
        };
        PlayState.prototype.preload = function () {
            this.loadSuitSprites(0 /* Blue */);
            this.loadSuitSprites(1 /* Red */);
        };
        PlayState.prototype.create = function () {
            this.createObjects(0 /* Blue */);
            this.createObjects(1 /* Red */);
        };
        PlayState.prototype.getCornerCoords = function (suit, indent) {
            switch (suit) {
                case 0 /* Blue */:
                    return new Phaser.Point(indent, this.game.world.width - indent);
                case 1 /* Red */:
                    return new Phaser.Point(this.game.world.width - indent, indent);
            }
            throw new Error("wrong suit");
        };
        PlayState.prototype.createObjects = function (suit) {
            var sight = new Celler.Sight(this.game, suit, PlayState.sightSize);
            var home = new Celler.Home(this.game, suit, PlayState.homeSize);
            var cell = new Celler.Cell(this.game, suit, PlayState.cellSize);
            this.game.add.existing(home);
            this.game.add.existing(sight);
            this.game.add.existing(cell);
            home.position = this.getCornerCoords(suit, home.width / 2);
            cell.position = home.position.clone();
            sight.position = cell.position.clone();
            cell.sight = sight;
            this.game.world.sendToBack(sight);
            this.game.world.sendToBack(cell);
            this.game.world.sendToBack(home);
        };
        PlayState.prototype.loadSuitSprites = function (suit) {
            this.loadSprite(suit, 3 /* Home */);
            this.loadSprite(suit, 0 /* CellBody */);
            this.loadSprite(suit, 1 /* CellEye */);
            this.loadSprite(suit, 2 /* Sight */);
        };
        PlayState.prototype.loadSprite = function (suit, assetType) {
            var typeName = Celler.Assets.Type[assetType].toLowerCase();
            var suitName = Celler.Suit[suit].toLowerCase();
            this.game.load.image(Celler.Assets.Sprites.getSpriteKey(suit, assetType), "" + Celler.Assets.Sprites.path + "/" + suitName + "/" + typeName + ".png");
        };
        PlayState.cellSize = 60;
        PlayState.sightSize = 80;
        PlayState.homeSize = 120;
        return PlayState;
    })(Phaser.State);
    Celler.PlayState = PlayState;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var App = (function () {
        function App() {
            this.server = new Celler.ServerAdapter();
            this.game = new Phaser.Game(600, 600, Phaser.AUTO, "celler-playground", {
                create: this.create
            }, false, true, null);
        }
        App.prototype.create = function () {
            this.game.state.add("PlayState", Celler.PlayState, true);
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
    var ServerAdapter = (function () {
        function ServerAdapter() {
            this.onSightCoordsUpdated = new Phaser.Signal();
            this.onCellCoordsUpdated = new Phaser.Signal();
            this.client = $.connection.gameHub.client;
            this.server = $.connection.gameHub.server;
            this.ready = false;
            this.init();
        }
        ServerAdapter.prototype.updateSightCoords = function (sight) {
            if (this.ready) {
                this.server.updateSightCoords(sight);
            }
        };
        ServerAdapter.prototype.moveCell = function (suit, to) {
            if (this.ready) {
                this.server.moveCell(suit, to);
            }
        };
        ServerAdapter.prototype.init = function () {
            var _this = this;
            this.client.sightCoordsUpdated = function (sight) {
                _this.sightCoordsUpdated(sight);
            };
            this.client.cellCoordsUpdated = function (cell) {
                _this.cellCoordsUpdated(cell);
            };
            $.connection.hub.start().done(function () {
                _this.ready = true;
            });
        };
        ServerAdapter.prototype.sightCoordsUpdated = function (sight) {
            this.onSightCoordsUpdated.dispatch(sight);
        };
        ServerAdapter.prototype.cellCoordsUpdated = function (cell) {
            this.onCellCoordsUpdated.dispatch(cell);
        };
        return ServerAdapter;
    })();
    Celler.ServerAdapter = ServerAdapter;
})(Celler || (Celler = {}));
//# sourceMappingURL=celler.js.map