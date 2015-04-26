var Celler;
(function (Celler) {
    var App = (function () {
        function App() {
            this.server = new Celler.ServerAdapter();
            this.game = new Phaser.Game(600, 600, Phaser.AUTO, "celler-playground", {
                create: this.create
            }, false, true, null);
        }
        App.prototype.create = function () {
            this.game.stage.backgroundColor = "#6aa84f";
            this.game.state.add("PlayState", Celler.PlayState, true);
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