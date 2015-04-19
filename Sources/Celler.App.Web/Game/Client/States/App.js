var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        //player: GameFromScratch.Player;
        //myScene: GameFromScratch.MyScene;
        function PlayState() {
            _super.call(this);
        }
        PlayState.prototype.preload = function () {
        };
        PlayState.prototype.create = function () {
            /*
                        this.myScene = new MyScene(this.game, 0, 0);
                        this.player = new Player(this.game, 0, this.game.height - 50);
            
                        this.game.add.existing(this.myScene);
                        this.game.add.existing(this.player);
            
                        this.game.world.setBounds(0,0,this.myScene.width * 2, this.myScene.height);
                        this.game.camera.follow(this.player);
            */
        };
        return PlayState;
    })(Phaser.State);
    Game.PlayState = PlayState;
})(Game || (Game = {}));
//# sourceMappingURL=App.js.map