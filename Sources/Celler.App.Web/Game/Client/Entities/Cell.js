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
        (function (PartType) {
            PartType[PartType["Body"] = 0] = "Body";
            PartType[PartType["Eye"] = 1] = "Eye";
        })(CellParts.PartType || (CellParts.PartType = {}));
        var PartType = CellParts.PartType;
        var Part = (function (_super) {
            __extends(Part, _super);
            function Part(cell, partType, x, y, scale) {
                this.parent = cell;
                this.partType = partType;
                var spriteName = Celler.Assets.Sprites.redBody;
                _super.call(this, cell.game, x, y, spriteName);
                this.scale.setTo(scale, scale);
            }
            return Part;
        })(Phaser.Sprite);
        CellParts.Part = Part;
        var Body = (function (_super) {
            __extends(Body, _super);
            function Body(cell) {
                _super.call(this, cell, 0 /* Body */, 0, 0, 0.125);
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
            this.suit = suit;
            this.addChild(this.body = new Celler.CellParts.Body(this));
            this.body.visible = true;
            this.visible = true;
            this.position = new Phaser.Point(300, 400);
        }
        Cell.prototype.showCoordsMessage = function (msg) {
            this.game.debug.text(msg, 10, 20);
        };
        return Cell;
    })(Phaser.Group);
    Celler.Cell = Cell;
})(Celler || (Celler = {}));
//# sourceMappingURL=Cell.js.map