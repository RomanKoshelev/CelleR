var Celler;
(function (Celler) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            });
            this.server = new Celler.Server();
        }
        App.prototype.create = function () {
            this.game.stage.backgroundColor = "#6aa84f";
            this.game.state.add("PlayState", Celler.GameplayState, true);
        };
        return App;
    })();
    Celler.App = App;
    Celler.app;
    function initApp() {
        Celler.app = new App();
    }
    Celler.initApp = initApp;
})(Celler || (Celler = {}));
window.onload = function () {
    Celler.initApp();
};
//# sourceMappingURL=App.js.map