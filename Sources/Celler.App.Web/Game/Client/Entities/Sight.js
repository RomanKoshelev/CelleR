var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var Sight = (function (_super) {
        __extends(Sight, _super);
        function Sight(game) {
            _super.call(this, game, game.world.width / 2, game.world.height / 2, Celler.Assets.Sprites.sight);
            this.alpha = 0.5;
            this.scale.x = this.scale.y = 0.15;
            this.anchor.setTo(0.5, 0.5);
            this.inputEnabled = true;
            this.input.enableDrag();
        }
        Sight.prototype.update = function () {
            var msg = this.position.toString();
            this.game.debug.text(msg, 10, 20);
            if (this.position.distance(this.previousPosition) > 10) {
                Celler.gameApp.connector.toServer(msg);
            }
            _super.prototype.update.call(this);
        };
        return Sight;
    })(Phaser.Sprite);
    Celler.Sight = Sight;
})(Celler || (Celler = {}));
//# sourceMappingURL=Sight.js.map