var Game;
(function (Game) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            });
            this.hub = new Game.GameHub();
        }
        App.prototype.create = function () {
            this.game.state.add("PlayState", Game.PlayState, true);
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