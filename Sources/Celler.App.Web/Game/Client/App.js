var Celler;
(function (Celler) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(610, 610, Phaser.AUTO, "celler-playground", {
                create: this.create
            });
            this.server = new Celler.GameConnector();
        }
        App.prototype.create = function () {
            this.game.stage.backgroundColor = "#6aa84f";
            this.game.state.add("PlayState", Celler.GameplayState, true);
        };
        return App;
    })();
    Celler.App = App;
    Celler.gameApp;
    function initApp() {
        Celler.gameApp = new App();
    }
    Celler.initApp = initApp;
})(Celler || (Celler = {}));
window.onload = function () {
    Celler.initApp();
};
//# sourceMappingURL=App.js.map