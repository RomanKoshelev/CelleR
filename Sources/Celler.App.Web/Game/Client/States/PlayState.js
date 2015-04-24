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
            this.game.load.image(Celler.Assets.Sprites.sight, "/Game/Client/Assets/Sprites/sight.png");
            this.game.load.image(Celler.Assets.Sprites.redBody, "/Game/Client/Assets/Sprites/red/body.png");
            this.game.load.image(Celler.Assets.Sprites.redEye, "/Game/Client/Assets/Sprites/red/eye.png");
        };
        GameplayState.prototype.create = function () {
            this.game.add.existing(new Celler.Playground(this.game));
            this.game.add.existing(this.cell = new Celler.Cell(this.game, 1 /* Red */));
            this.game.add.existing(this.sight = new Celler.Sight(this.game));
            this.sight.onUpdateCoords.add(this.sendSightCoordsToServer, this);
            Celler.gameApp.connector.onFromServer.add(this.cell.showCoordsMessage, this.cell);
        };
        GameplayState.prototype.sendSightCoordsToServer = function (coords) {
            Celler.gameApp.connector.sendMessageToServer(coords.toString());
        };
        return GameplayState;
    })(Phaser.State);
    Celler.GameplayState = GameplayState;
})(Celler || (Celler = {}));
//# sourceMappingURL=PlayState.js.map