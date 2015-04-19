var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var Playground = (function (_super) {
        __extends(Playground, _super);
        function Playground(game) {
            _super.call(this, game, game.world.width / 2, game.world.height / 2, "ground");
            this.game.stage.backgroundColor = "#6aa84f";
            this.anchor.setTo(0.5, 0.5);
            this.scale.setTo(0.2, 0.2);
            this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        }
        return Playground;
    })(Phaser.Sprite);
    Game.Playground = Playground;
})(Game || (Game = {}));
//# sourceMappingURL=Playground.js.map