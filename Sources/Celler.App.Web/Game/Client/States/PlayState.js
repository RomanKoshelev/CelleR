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
            this.game.load.image(Celler.Assets.Sprites.playground, "/Game/Client/Assets/Sprites/ground.png");
            this.game.load.image(Celler.Assets.Sprites.getSpriteKey(2 /* Sight */, 1 /* Red */), "/Game/Client/Assets/Sprites/red/sight.png");
            this.game.load.image(Celler.Assets.Sprites.getSpriteKey(0 /* CellBody */, 1 /* Red */), "/Game/Client/Assets/Sprites/red/body.png");
        };
        GameplayState.prototype.create = function () {
            this.game.add.existing(new Celler.Playground(this.game));
            this.game.add.existing(new Celler.Cell(this.game, 1 /* Red */));
            this.game.add.existing(new Celler.Sight(this.game, 1 /* Red */));
        };
        return GameplayState;
    })(Phaser.State);
    Celler.GameplayState = GameplayState;
})(Celler || (Celler = {}));
//# sourceMappingURL=PlayState.js.map