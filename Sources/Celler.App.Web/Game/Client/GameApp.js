// Here: TS | GameApp.ts
var Celler;
(function (Celler) {
    var gameHub;
    var gameView;
    function initApp() {
        gameHub = new Celler.GameHub();
        gameView = new Celler.GameView();
    }
    Celler.initApp = initApp;
})(Celler || (Celler = {}));
window.onload = function () {
    Celler.initApp();
};
//# sourceMappingURL=GameApp.js.map