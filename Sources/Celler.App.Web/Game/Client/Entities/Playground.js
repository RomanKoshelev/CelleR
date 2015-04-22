var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var Playground = (function (_super) {
        __extends(Playground, _super);
        function Playground(game) {
            _super.call(this, game, game.world.width / 2, game.world.height / 2, Celler.Assets.Sprites.playground);
            this.anchor.setTo(0.5, 0.5);
            this.scale.setTo(1, 1);
        }
        return Playground;
    })(Phaser.Sprite);
    Celler.Playground = Playground;
})(Celler || (Celler = {}));
//# sourceMappingURL=Playground.js.map