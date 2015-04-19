// Code: Here: TS | GameApp.ts

module Celler {
    var gameHub: GameHub;
    var gameView: GameView;

    export function initApp() {
        gameHub = new GameHub();
        gameView = new GameView();
    }
}

$( () => {
    Celler.initApp();
} );