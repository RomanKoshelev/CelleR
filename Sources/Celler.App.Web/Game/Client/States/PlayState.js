var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            _super.call(this);
        }
        PlayState.prototype.preload = function () {
            this.loadSprite(1 /* Red */, 3 /* Home */);
            this.loadSprite(1 /* Red */, 0 /* CellBody */);
            this.loadSprite(1 /* Red */, 1 /* CellEye */);
            this.loadSprite(1 /* Red */, 2 /* Sight */);
            this.loadSprite(0 /* Blue */, 3 /* Home */);
            this.loadSprite(0 /* Blue */, 0 /* CellBody */);
            this.loadSprite(0 /* Blue */, 1 /* CellEye */);
            this.loadSprite(0 /* Blue */, 2 /* Sight */);
        };
        PlayState.prototype.create = function () {
            this.createSuitObjects(1 /* Red */);
            this.createSuitObjects(0 /* Blue */);
        };
        PlayState.prototype.loadSprite = function (suit, assetType) {
            var typeName = Celler.Assets.Type[assetType].toLowerCase();
            var suitName = Celler.Suit[suit].toLowerCase();
            this.game.load.image(Celler.Assets.Sprites.getSpriteKey(suit, assetType), "" + Celler.Assets.Sprites.path + "/" + suitName + "/" + typeName + ".png");
        };
        PlayState.prototype.getCornerCoords = function (suit, indent) {
            switch (suit) {
                case 0 /* Blue */:
                    return new Phaser.Point(this.game.world.width - indent, indent);
                case 1 /* Red */:
                    return new Phaser.Point(indent, this.game.world.width - indent);
            }
            throw new Error("wrong suit");
        };
        PlayState.prototype.createSuitObjects = function (suit) {
            var sight = new Celler.Sight(this.game, suit, PlayState.sightSize);
            var home = new Celler.Home(this.game, suit, PlayState.homeSize);
            var cell = new Celler.Cell(this.game, suit, PlayState.cellSize);
            this.game.add.existing(home);
            this.game.add.existing(sight);
            this.game.add.existing(cell);
            home.position = this.getCornerCoords(suit, home.width / 2);
            cell.position = home.position.clone();
            sight.position = cell.position.clone();
            this.game.world.sendToBack(sight);
            this.game.world.sendToBack(cell);
            this.game.world.sendToBack(home);
        };
        PlayState.cellSize = 60;
        PlayState.sightSize = 80;
        PlayState.homeSize = 100;
        return PlayState;
    })(Phaser.State);
    Celler.PlayState = PlayState;
})(Celler || (Celler = {}));
//# sourceMappingURL=PlayState.js.map