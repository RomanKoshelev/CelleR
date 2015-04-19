// Code: Here: TS | GameView.ts
var Celler;
(function (Celler) {
    var GameView = (function () {
        function GameView() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, "celler-playground", {
                preload: this.preload,
                create: this.create
            });
        }
        GameView.prototype.preload = function () {
        };
        GameView.prototype.create = function () {
            this.game.stage.backgroundColor = "#b6d7a8";
        };
        return GameView;
    })();
    Celler.GameView = GameView;
})(Celler || (Celler = {}));
//# sourceMappingURL=GameView.js.map