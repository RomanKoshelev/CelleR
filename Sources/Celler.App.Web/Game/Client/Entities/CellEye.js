var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var CellEye = (function (_super) {
        __extends(CellEye, _super);
        function CellEye(cell) {
            _super.call(this, cell.game, 0, 0, Celler.Assets.Sprites.sight);
            this.parent = cell;
        }
        return CellEye;
    })(Phaser.Sprite);
    Celler.CellEye = CellEye;
})(Celler || (Celler = {}));
//# sourceMappingURL=CellEye.js.map