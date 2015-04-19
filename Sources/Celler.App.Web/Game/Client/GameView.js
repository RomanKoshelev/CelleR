// Code: Here: TS | GameView.ts
var Celler;
(function (Celler) {
    var GameView = (function () {
        function GameView() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", {
                preload: this.preload,
                create: this.create
            });
        }
        GameView.prototype.preload = function () {
            this.game.load.image("logo", "Game-Sample.png");
        };
        GameView.prototype.create = function () {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
            logo.anchor.setTo(0.5, 0.5);
            logo.scale.setTo(0.2, 0.2);
            this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        };
        return GameView;
    })();
    Celler.GameView = GameView;
})(Celler || (Celler = {}));
//# sourceMappingURL=GameView.js.map