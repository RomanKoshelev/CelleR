var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var CellPart = (function (_super) {
        __extends(CellPart, _super);
        function CellPart(cell, assetType) {
            this.parent = cell;
            _super.call(this, cell.game, 0, 0, Celler.Assets.Sprites.getSpriteKey(cell.suit, assetType));
            this.anchor.set(0.5);
            this.parent = cell;
        }
        return CellPart;
    })(Phaser.Sprite);
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(game, suit, size) {
            _super.call(this, game);
            this.init(suit, size);
            Celler.app.server.onSightCoordsUpdated.add(this.onSightCoordsUpdated, this);
        }
        Cell.prototype.init = function (suit, size) {
            this.suit = suit;
            this.addChild(this.body = new CellPart(this, 0 /* CellBody */));
            this.addChild(this.eye = new CellPart(this, 1 /* CellEye */));
            this.scale.set(size / this.width);
            this.eyeScale = this.calcEyeScale();
            this.setEyeScale(this.eyeScale);
        };
        Cell.prototype.onSightCoordsUpdated = function (model) {
            if (Celler.Suit[model.Suit] === this.suit) {
                this.lookAt(new Phaser.Point(model.X, model.Y));
            }
        };
        Cell.prototype.lookAt = function (p) {
            var r = this.width / 4;
            var l = Phaser.Point.distance(this.position, p);
            var c = this.width;
            var e = c * this.eyeScale;
            var d = (c - e) / 2;
            var m = d / this.scale.x;
            p = Phaser.Point.subtract(p, this.position);
            p = p.normalize();
            p = p.multiply(m, m);
            this.eye.position = l > r ? p : new Phaser.Point();
        };
        Cell.prototype.calcEyeScale = function () {
            return 0.75;
        };
        Cell.prototype.setEyeScale = function (eyeScale) {
            this.eye.scale.set(eyeScale);
        };
        return Cell;
    })(Phaser.Group);
    Celler.Cell = Cell;
})(Celler || (Celler = {}));
//# sourceMappingURL=Cell.js.map