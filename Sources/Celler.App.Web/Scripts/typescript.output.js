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
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home(game, suit, size) {
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.getSpriteKey(suit, 3 /* Home */));
            this.scale.set(size / this.width);
            this.anchor.set(0.5);
        }
        return Home;
    })(Phaser.Sprite);
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
    var CellParts;
    (function (CellParts) {
        var Part = (function (_super) {
            __extends(Part, _super);
            function Part(cell, assetType) {
                this.parent = cell;
                _super.call(this, cell.game, 0, 0, Celler.Assets.Sprites.getSpriteKey(cell.suit, assetType));
                this.parent = cell;
            }
            return Part;
        })(Phaser.Sprite);
        CellParts.Part = Part;
        var Body = (function (_super) {
            __extends(Body, _super);
            function Body(cell) {
                _super.call(this, cell, 0 /* CellBody */);
                this.anchor.set(0.5);
            }
            return Body;
        })(Part);
        CellParts.Body = Body;
        var Eye = (function (_super) {
            __extends(Eye, _super);
            function Eye(cell) {
                _super.call(this, cell, 1 /* CellEye */);
                this.anchor.set(0.5);
                this.scale.set(0.75);
            }
            return Eye;
        })(Part);
        CellParts.Eye = Eye;
    })(CellParts = Celler.CellParts || (Celler.CellParts = {}));
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(game, suit, size) {
            _super.call(this, game);
            this.init(suit, size);
            Celler.app.server.onSightCoordsUpdated.add(this.onSightCoordsUpdated, this);
        }
        Cell.prototype.init = function (suit, size) {
            this.suit = suit;
            this.addChild(this.body = new Celler.CellParts.Body(this));
            this.addChild(this.eye = new Celler.CellParts.Eye(this));
            this.scale.set(size / this.width);
        };
        Cell.prototype.onSightCoordsUpdated = function (model) {
            if (Celler.Suit[model.Suit] === this.suit) {
                this.game.debug.text("x=" + model.X + ", y=" + model.Y, 10, 20);
                this.position.setTo(model.X, model.Y);
            }
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
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.getSpriteKey(suit, 2 /* Sight */));
            this.prevUpdatePosition = new Phaser.Point(0, 0);
            this.init(suit, size);
        }
        Sight.prototype.update = function () {
            this.doUpdate();
            _super.prototype.update.call(this);
        };
        Sight.prototype.init = function (suit, size) {
            this.suit = suit;
            this.scale.set(size / this.width);
            this.anchor.set(0.5);
            this.inputEnabled = true;
            this.input.enableDrag();
        };
        Sight.prototype.doUpdate = function () {
            if (this.position.distance(this.prevUpdatePosition) > 0) {
                this.prevUpdatePosition = this.position.clone();
                Celler.app.server.updateSightCoords(this.toModel());
            }
        };
        Sight.prototype.toModel = function () {
            return {
                Suit: Celler.Suit[this.suit],
                X: this.position.x,
                Y: this.position.y
            };
        };
        return Sight;
    })(Phaser.Sprite);
    Celler.Sight = Sight;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            _super.call(this);
        }
        PlayState.prototype.preload = function () {
            this.loadSprite(1 /* Red */, 3 /* Home */);
            this.loadSprite(1 /* Red */, 0 /* CellBody */);
            this.loadSprite(1 /* Red */, 1 /* CellEye */);
            this.loadSprite(1 /* Red */, 2 /* Sight */);
            this.loadSprite(0 /* Blue */, 3 /* Home */);
            this.loadSprite(0 /* Blue */, 0 /* CellBody */);
            this.loadSprite(0 /* Blue */, 1 /* CellEye */);
            this.loadSprite(0 /* Blue */, 2 /* Sight */);
        };
        PlayState.prototype.create = function () {
            this.createSuitObjects(1 /* Red */);
            this.createSuitObjects(0 /* Blue */);
        };
        PlayState.prototype.loadSprite = function (suit, assetType) {
            var typeName = Celler.Assets.Type[assetType].toLowerCase();
            var suitName = Celler.Suit[suit].toLowerCase();
            this.game.load.image(Celler.Assets.Sprites.getSpriteKey(suit, assetType), "" + Celler.Assets.Sprites.path + "/" + suitName + "/" + typeName + ".png");
        };
        PlayState.prototype.getCornerCoords = function (suit, indent) {
            switch (suit) {
                case 0 /* Blue */:
                    return new Phaser.Point(this.game.world.width - indent, indent);
                case 1 /* Red */:
                    return new Phaser.Point(indent, this.game.world.width - indent);
            }
            throw new Error("wrong suit");
        };
        PlayState.prototype.createSuitObjects = function (suit) {
            var sight = new Celler.Sight(this.game, suit, PlayState.sightSize);
            var home = new Celler.Home(this.game, suit, PlayState.homeSize);
            var cell = new Celler.Cell(this.game, suit, PlayState.cellSize);
            this.game.add.existing(home);
            this.game.add.existing(sight);
            this.game.add.existing(cell);
            home.position = this.getCornerCoords(suit, home.width / 2);
            cell.position = home.position.clone();
            sight.position = cell.position.clone();
            this.game.world.sendToBack(sight);
            this.game.world.sendToBack(cell);
            this.game.world.sendToBack(home);
        };
        PlayState.cellSize = 60;
        PlayState.sightSize = 80;
        PlayState.homeSize = 100;
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
            this.game.stage.backgroundColor = "#6aa84f";
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
        ServerAdapter.prototype.init = function () {
            var _this = this;
            this.client.sightCoordsUpdated = function (sight) {
                _this.sightCoordsUpdated(sight);
            };
            $.connection.hub.start().done(function () {
                _this.ready = true;
            });
        };
        ServerAdapter.prototype.sightCoordsUpdated = function (sight) {
            this.onSightCoordsUpdated.dispatch(sight);
        };
        return ServerAdapter;
    })();
    Celler.ServerAdapter = ServerAdapter;
})(Celler || (Celler = {}));
//# sourceMappingURL=typescript.output.js.map