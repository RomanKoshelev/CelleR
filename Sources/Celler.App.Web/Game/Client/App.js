// Code: Here: TS | Game.App.ts
var Game;
(function (Game) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(610, 610, Phaser.AUTO, "celler-playground", {
                preload: this.preload,
                create: this.create
            });
            this.hub = new Game.GameHub();
        }
        App.prototype.preload = function () {
            this.game.load.image("ground", "/Game/Client/Assets/Sprites/ground.png");
        };
        App.prototype.create = function () {
            this.game.stage.backgroundColor = "#6aa84f";
            var groudSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "ground");
            groudSprite.anchor.setTo(0.5, 0.5);
            groudSprite.scale.setTo(0.2, 0.2);
            this.game.add.tween(groudSprite.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        };
        return App;
    })();
    Game.App = App;
    var gameView;
    function initApp() {
        gameView = new App();
    }
    Game.initApp = initApp;
})(Game || (Game = {}));
window.onload = function () {
    Game.initApp();
};
//# sourceMappingURL=App.js.map