var Celler;
(function (Celler) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            });
            this.hub = new Celler.GameHub();
        }
        App.prototype.create = function () {
            this.game.stage.backgroundColor = "#6aa84f";
            this.game.state.add("PlayState", Celler.GameplayState, true);
        };
        return App;
    })();
    Celler.App = App;
    var gameView;
    function initApp() {
        gameView = new App();
    }
    Celler.initApp = initApp;
})(Celler || (Celler = {}));
window.onload = function () {
    Celler.initApp();
};
//# sourceMappingURL=App.js.map