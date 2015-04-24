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
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.sight);
            this.prevUpdatePosition = new Phaser.Point(0, 0);
            this.init();
        }
        Sight.prototype.update = function () {
            this.doUpdate();
            _super.prototype.update.call(this);
        };
        Sight.prototype.init = function () {
            this.alpha = 0.5;
            this.scale.x = this.scale.y = 0.15;
            this.anchor.setTo(0.5, 0.5);
            this.position.setTo(this.game.world.width / 2, this.game.world.height / 2);
            this.inputEnabled = true;
            this.input.enableDrag();
        };
        Sight.prototype.doUpdate = function () {
            if (this.position.distance(this.prevUpdatePosition) > 10) {
                this.prevUpdatePosition = this.position.clone();
                Celler.gameApp.server.updateSightCoords(this.position.x, this.position.y);
            }
            _super.prototype.update.call(this);
        };
        return Sight;
    })(Phaser.Sprite);
    Celler.Sight = Sight;
})(Celler || (Celler = {}));
//# sourceMappingURL=Sight.js.map