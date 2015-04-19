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
        function PlayState() {
            _super.call(this);
        }
        PlayState.prototype.preload = function () {
            this.game.load.image("ground", "/Game/Client/Assets/Sprites/ground.png");
        };
        PlayState.prototype.create = function () {
            this.playground = new Game.Playground(this.game);
            this.game.add.existing(this.playground);
        };
        return PlayState;
    })(Phaser.State);
    Game.PlayState = PlayState;
})(Game || (Game = {}));
//# sourceMappingURL=PlayState.js.map