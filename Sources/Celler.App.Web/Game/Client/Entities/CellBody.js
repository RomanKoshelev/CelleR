var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var CellBody = (function (_super) {
        __extends(CellBody, _super);
        function CellBody(cell) {
            this.parent = cell;
            _super.call(this, cell.game, 0, 0, Celler.Assets.Sprites.sight);
            this.alpha = 0.5;
            this.scale.x = this.scale.y = 0.15;
        }
        return CellBody;
    })(Phaser.Sprite);
    Celler.CellBody = CellBody;
})(Celler || (Celler = {}));
//# sourceMappingURL=CellBody.js.map