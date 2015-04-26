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
            this.loadSprite(0 /* Common */, 0 /* Playground */);
            this.loadSprite(2 /* Red */, 1 /* CellBody */);
            this.loadSprite(2 /* Red */, 3 /* Sight */);
            /*
                        this.loadSprite( Suit.Blue, Assets.Type.CellBody );
                        this.loadSprite( Suit.Blue, Assets.Type.Sight );
            */
        };
        GameplayState.prototype.create = function () {
            this.game.add.existing(new Celler.Playground(this.game));
            this.game.add.existing(new Celler.Cell(this.game, 2 /* Red */, this.getSpawnCoords(2 /* Red */)));
            this.game.add.existing(new Celler.Sight(this.game, 2 /* Red */));
            /*
                        this.game.add.existing( new Cell( this.game, Suit.Blue, this.getSpawnCoords( Suit.Blue ) ) );
                        this.game.add.existing( new Sight( this.game, Suit.Blue ) );
            */
        };
        GameplayState.prototype.loadSprite = function (suit, assetType) {
            var typeName = Celler.Assets.Type[assetType].toLowerCase();
            var suitName = Celler.Suit[suit].toLowerCase();
            this.game.load.image(Celler.Assets.Sprites.getSpriteKey(suit, assetType), "" + Celler.Assets.Sprites.path + "/" + suitName + "/" + typeName + ".png");
        };
        GameplayState.prototype.getSpawnCoords = function (suit) {
            var cellSize = 20;
            switch (suit) {
                case 1 /* Blue */:
                    return new Phaser.Point(this.game.world.width - cellSize, cellSize);
                case 2 /* Red */:
                    return new Phaser.Point(cellSize, this.game.world.width - cellSize);
            }
            throw new Error("wrong suit");
        };
        return GameplayState;
    })(Phaser.State);
    Celler.GameplayState = GameplayState;
})(Celler || (Celler = {}));
//# sourceMappingURL=PlayState.js.map