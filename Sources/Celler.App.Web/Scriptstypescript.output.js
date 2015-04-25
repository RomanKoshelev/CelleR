var Celler;
(function (Celler) {
    var App = (function () {
        function App() {
            this.server = new Celler.ServerAdapter();
            this.game = new Phaser.Game(610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            });
        }
        App.prototype.create = function () {
            this.game.stage.backgroundColor = "#6aa84f";
            this.game.state.add("PlayState", Celler.GameplayState, true);
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
            Type[Type["Playground"] = 0] = "Playground";
            Type[Type["CellBody"] = 1] = "CellBody";
            Type[Type["CellEye"] = 2] = "CellEye";
            Type[Type["Sight"] = 3] = "Sight";
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
    var CellParts;
    (function (CellParts) {
        var Part = (function (_super) {
            __extends(Part, _super);
            function Part(cell, assetType, scale, x, y) {
                if (scale === void 0) { scale = 1; }
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.parent = cell;
                _super.call(this, cell.game, x, y, Celler.Assets.Sprites.getSpriteKey(cell.suit, assetType));
                this.scale.setTo(scale, scale);
            }
            return Part;
        })(Phaser.Sprite);
        CellParts.Part = Part;
        var Body = (function (_super) {
            __extends(Body, _super);
            function Body(cell) {
                _super.call(this, cell, 1 /* CellBody */, 0.125);
                this.anchor.setTo(0.5, 0.5);
            }
            return Body;
        })(Part);
        CellParts.Body = Body;
    })(CellParts = Celler.CellParts || (Celler.CellParts = {}));
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(game, suit) {
            _super.call(this, game);
            this.init(suit);
            Celler.app.server.onSightCoordsUpdated.add(this.onSightCoordsUpdated, this);
        }
        Cell.prototype.init = function (suit) {
            this.suit = suit;
            this.addChild(this.body = new Celler.CellParts.Body(this));
            this.body.visible = true;
            this.visible = true;
            this.position = new Phaser.Point(300, 400);
        };
        Cell.prototype.onSightCoordsUpdated = function (sight) {
            this.game.debug.text(sight.toString(), 10, 20);
            this.position.setTo(sight.X, sight.Y);
        };
        return Cell;
    })(Phaser.Group);
    Celler.Cell = Cell;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Playground = (function (_super) {
        __extends(Playground, _super);
        function Playground(game) {
            _super.call(this, game, game.world.width / 2, game.world.height / 2, Celler.Assets.Sprites.getSpriteKey(0 /* Common */, 0 /* Playground */));
            this.alpha = 0.5;
            this.anchor.setTo(0.5, 0.5);
        }
        return Playground;
    })(Phaser.Sprite);
    Celler.Playground = Playground;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Sight = (function (_super) {
        __extends(Sight, _super);
        function Sight(game, suit) {
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.getSpriteKey(suit, 3 /* Sight */));
            this.prevUpdatePosition = new Phaser.Point(0, 0);
            this.init(suit);
        }
        Sight.prototype.update = function () {
            this.doUpdate();
            _super.prototype.update.call(this);
        };
        Sight.prototype.init = function (suit) {
            this.suit = suit;
            this.alpha = 0.85;
            this.scale.x = this.scale.y = 0.15;
            this.anchor.setTo(0.5, 0.5);
            this.position.setTo(this.game.world.width / 2, this.game.world.height / 2);
            this.inputEnabled = true;
            this.input.enableDrag();
        };
        Sight.prototype.doUpdate = function () {
            if (this.position.distance(this.prevUpdatePosition) > 10) {
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
    (function (Suit) {
        Suit[Suit["Common"] = 0] = "Common";
        Suit[Suit["Blue"] = 1] = "Blue";
        Suit[Suit["Red"] = 2] = "Red";
    })(Celler.Suit || (Celler.Suit = {}));
    var Suit = Celler.Suit;
})(Celler || (Celler = {}));
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
var Celler;
(function (Celler) {
    var GameplayState = (function (_super) {
        __extends(GameplayState, _super);
        function GameplayState() {
            _super.call(this);
        }
        GameplayState.prototype.preload = function () {
            this.loadSprite(0 /* Common */, 0 /* Playground */);
            this.loadSprite(2 /* Red */, 1 /* CellBody */);
            this.loadSprite(2 /* Red */, 3 /* Sight */);
        };
        GameplayState.prototype.create = function () {
            this.game.add.existing(new Celler.Playground(this.game));
            this.game.add.existing(new Celler.Cell(this.game, 2 /* Red */));
            this.game.add.existing(new Celler.Sight(this.game, 2 /* Red */));
        };
        GameplayState.prototype.loadSprite = function (suit, assetType) {
            var typeName = Celler.Assets.Type[assetType].toLowerCase();
            var suitName = Celler.Suit[suit].toLowerCase();
            this.game.load.image(Celler.Assets.Sprites.getSpriteKey(suit, assetType), "" + Celler.Assets.Sprites.path + "/" + suitName + "/" + typeName + ".png");
        };
        return GameplayState;
    })(Phaser.State);
    Celler.GameplayState = GameplayState;
})(Celler || (Celler = {}));
//# sourceMappingURL=Scriptstypescript.output.js.map