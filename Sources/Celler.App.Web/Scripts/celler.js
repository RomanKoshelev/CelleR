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
            this.game.state.add("Room", Celler.Room, true);
        };
        App.prototype.init = function () {
            var _this = this;
            this.server.getPlayerId().done(function (id) {
                _this.playerId = id;
            });
            this.server.getBounds().done(function (bounds) {
                _this.createGame(bounds.Width, bounds.Height);
            });
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
            Type[Type["Home"] = 3] = "Home";
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
        function Cell(game, suit, size) {
            _super.call(this, game);
            this.init(suit, size);
            Celler.app.server.onCellMoved.add(this.onCellMoved, this);
            Celler.app.server.onSightPositionHinted.add(this.onSightPositionHinted, this);
        }
        Cell.prototype.update = function () {
            this.lookAtSigtPoint();
            _super.prototype.update.call(this);
        };
        Cell.prototype.init = function (suit, size) {
            this.addChild(this.body = new Celler.SuitSprite(this.game, suit, 0 /* CellBody */));
            this.addChild(this.eye = new Celler.SuitSprite(this.game, suit, 1 /* CellEye */));
            this.suit = suit;
            this.scale.set(size / this.width);
            this.updateEyeSize();
        };
        Cell.prototype.onCellMoved = function (position) {
            if (Celler.Suit[position.Suit] === this.suit) {
                this.game.add.tween(this).to({ x: position.Point.X, y: position.Point.Y }, 500, Phaser.Easing.Circular.InOut, true);
            }
        };
        Cell.prototype.onSightPositionHinted = function (position) {
            if (Celler.Suit[position.Suit] === this.suit) {
                this.sightPoint = new Phaser.Point(position.Point.X, position.Point.Y);
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
    var Room = (function (_super) {
        __extends(Room, _super);
        function Room() {
            _super.call(this);
        }
        Room.prototype.init = function () {
            this.game.stage.backgroundColor = Room.background;
        };
        Room.prototype.preload = function () {
            this.preloadSprites(0 /* Blue */);
            this.preloadSprites(1 /* Red */);
        };
        Room.prototype.create = function () {
            this.session = new Celler.Session(this);
        };
        Room.prototype.update = function () {
            this.game.debug.text("" + Celler.app.playerId + " [" + Celler.app.tickCount + "]", 10, 20);
            this.session.sights[Celler.app.playerSuit].procKeyboard();
        };
        Room.prototype.preloadSprites = function (suit) {
            Celler.Assets.Sprites.load(suit, 3 /* Home */);
            Celler.Assets.Sprites.load(suit, 0 /* CellBody */);
            Celler.Assets.Sprites.load(suit, 1 /* CellEye */);
            Celler.Assets.Sprites.load(suit, 2 /* Sight */);
        };
        Room.cellSize = 65;
        Room.sightSize = 100;
        Room.homeSize = 150;
        Room.background = "#004400";
        return Room;
    })(Phaser.State);
    Celler.Room = Room;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Session = (function () {
        function Session(room) {
            var _this = this;
            this.sights = [];
            this.room = room;
            this.game = room.game;
            Celler.app.server.getSession().done(function (sesion) {
                _this.createObjects(sesion);
            });
        }
        // Code: createObjects ( model: SessionModel ) 
        Session.prototype.createObjects = function (model) {
            for (var c in model.Cells) {
                var suit;
                suit = Celler.Suit[""];
                var cell = new Celler.Cell(this.game, suit, Celler.Room.cellSize);
                this.game.add.existing(cell);
            }
        };
        Session.prototype.xxxCreateObjects = function (suit) {
            var sight = new Celler.Sight(this.game, suit, Celler.Room.sightSize);
            var home = new Celler.Home(this.game, suit, Celler.Room.homeSize);
            var cell = new Celler.Cell(this.game, suit, Celler.Room.cellSize);
            this.game.add.existing(home);
            this.game.add.existing(sight);
            this.game.add.existing(cell);
            home.position = this.getCornerCoords(suit, home.width / 2);
            cell.position = home.position.clone();
            sight.position = cell.position.clone();
            this.game.world.sendToBack(sight);
            this.game.world.sendToBack(cell);
            this.game.world.sendToBack(home);
            this.sights[suit] = sight;
        };
        Session.prototype.getCornerCoords = function (suit, margin) {
            switch (suit) {
                case 0 /* Blue */:
                    return new Phaser.Point(margin, this.game.world.width - margin);
                case 1 /* Red */:
                    return new Phaser.Point(this.game.world.width - margin, margin);
            }
            throw new Error("Unsupported suit " + Celler.Suit[suit]);
        };
        return Session;
    })();
    Celler.Session = Session;
})(Celler || (Celler = {}));
var Celler;
(function (Celler) {
    var Sight = (function (_super) {
        __extends(Sight, _super);
        function Sight(game, suit, size) {
            _super.call(this, game, suit, 2 /* Sight */, size);
            this.inTweening = false;
            this.prevHintPosition = new Phaser.Point(0, 0);
            this.inputEnabled = true;
            this.input.enableDrag();
            this.input.enableDrag();
            this.events.onDragStop.add(this.onDragStop, this);
            Celler.app.server.onSightMoved.add(this.onSightMoved, this);
        }
        Sight.prototype.update = function () {
            this.serverHintSightPosition();
            _super.prototype.update.call(this);
        };
        Sight.prototype.procKeyboard = function () {
            this.doProcKeyboard();
        };
        Sight.prototype.onDragStop = function () {
            Celler.app.server.moveSight(this.toSuitPositionModel());
            Celler.app.server.moveCell(this.toSuitPositionModel());
        };
        Sight.prototype.onSightMoved = function (position) {
            if (Celler.Suit[position.Suit] === this.suit) {
                this.inTweening = true;
                this.tween = this.game.add.tween(this).to({ x: position.Point.X, y: position.Point.Y }, 200, Phaser.Easing.Circular.InOut, true);
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
        Sight.prototype.toSuitPositionModel = function () {
            return {
                Suit: Celler.Suit[this.suit],
                Point: {
                    X: this.position.x,
                    Y: this.position.y
                }
            };
        };
        Sight.prototype.serverHintSightPosition = function () {
            if (!this.inTweening && this.position.distance(this.prevHintPosition) > Sight.minHintDistance) {
                this.prevHintPosition = this.position.clone();
                Celler.app.server.hintSightPosition(this.toSuitPositionModel());
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
                Celler.app.server.moveSight(this.toSuitPositionModel());
                Celler.app.server.moveCell(this.toSuitPositionModel());
            }
        };
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
                this.scale.set(size / this.width);
            }
        }
        return SuitSprite;
    })(Phaser.Sprite);
    Celler.SuitSprite = SuitSprite;
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
            this.onTickCountUpdated = new Phaser.Signal();
            this.client = $.connection.gameHub.client;
            this.init();
        }
        ServerAdapter.prototype.hintSightPosition = function (position) {
            return this.server.hintSightPosition(position);
        };
        ServerAdapter.prototype.moveCell = function (position) {
            return this.server.moveCell(position);
        };
        ServerAdapter.prototype.moveSight = function (position) {
            return this.server.moveSight(position);
        };
        ServerAdapter.prototype.getPlayerId = function () {
            return this.server.getPlayerId();
        };
        ServerAdapter.prototype.getBounds = function () {
            return this.server.getBounds();
        };
        ServerAdapter.prototype.getSession = function () {
            return this.server.getSession();
        };
        ServerAdapter.prototype.init = function () {
            var _this = this;
            this.client.sightPositionHinted = function (position) {
                _this.sightPositionHinted(position);
            };
            this.client.cellMoved = function (position) {
                _this.cellMoved(position);
            };
            this.client.sightMoved = function (position) {
                _this.sightMoved(position);
            };
            this.client.tickCountUpdated = function (count) {
                _this.tickCountUpdated(count);
            };
            $.connection.hub.start().done(function () {
                _this.onStarted.dispatch();
            });
        };
        ServerAdapter.prototype.sightPositionHinted = function (position) {
            this.onSightPositionHinted.dispatch(position);
        };
        ServerAdapter.prototype.cellMoved = function (position) {
            this.onCellMoved.dispatch(position);
        };
        ServerAdapter.prototype.sightMoved = function (position) {
            this.onSightMoved.dispatch(position);
        };
        ServerAdapter.prototype.tickCountUpdated = function (count) {
            this.onTickCountUpdated.dispatch(count);
        };
        return ServerAdapter;
    })();
    Celler.ServerAdapter = ServerAdapter;
})(Celler || (Celler = {}));
//# sourceMappingURL=celler.js.map