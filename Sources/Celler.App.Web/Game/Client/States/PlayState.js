var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var GameplayState = (function (_super) {
        __extends(GameplayState, _super);
        function GameplayState() {
            _super.call(this);
        }
        GameplayState.prototype.preload = function () {
            this.game.load.image(Celler.Assets.Sprites.Playground, "/Game/Client/Assets/Sprites/ground.png");
            this.game.load.image(Celler.Assets.Sprites.Sight, "/Game/Client/Assets/Sprites/sight.png");
        };
        GameplayState.prototype.create = function () {
            this.game.add.existing(new Celler.Playground(this.game));
            this.game.add.existing(new Celler.Sight(this.game));
        };
        return GameplayState;
    })(Phaser.State);
    Celler.GameplayState = GameplayState;
})(Celler || (Celler = {}));
//# sourceMappingURL=PlayState.js.map