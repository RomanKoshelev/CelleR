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
//# sourceMappingURL=Cell.js.map