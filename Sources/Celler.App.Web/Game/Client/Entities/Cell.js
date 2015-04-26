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
        function Cell(game, suit, position) {
            _super.call(this, game);
            this.init(suit, position);
            Celler.app.server.onSightCoordsUpdated.add(this.onSightCoordsUpdated, this);
        }
        Cell.prototype.init = function (suit, position) {
            this.suit = suit;
            this.addChild(this.body = new Celler.CellParts.Body(this));
            this.body.visible = true;
            this.visible = true;
            this.position = position.clone();
        };
        Cell.prototype.onSightCoordsUpdated = function (sight) {
            //this.game.debug.text( "xxx", 10, 20 );
            //this.game.debug.text( `x=${sight.X}, y=${sight.Y}`, 10, 20 );
            //this.position.setTo( sight.X, sight.Y );
        };
        return Cell;
    })(Phaser.Group);
    Celler.Cell = Cell;
})(Celler || (Celler = {}));
//# sourceMappingURL=Cell.js.map