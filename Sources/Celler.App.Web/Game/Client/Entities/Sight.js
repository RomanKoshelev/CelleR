var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var Sight = (function (_super) {
        __extends(Sight, _super);
        function Sight(game, suit, size) {
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.getSpriteKey(suit, 2 /* Sight */));
            this.prevUpdatePosition = new Phaser.Point(0, 0);
            this.init(suit, size);
        }
        Sight.prototype.update = function () {
            this.doUpdate();
            _super.prototype.update.call(this);
        };
        Sight.prototype.init = function (suit, size) {
            this.suit = suit;
            this.scale.set(size / this.width);
            this.anchor.set(0.5);
            this.inputEnabled = true;
            this.input.enableDrag();
        };
        Sight.prototype.doUpdate = function () {
            if (this.position.distance(this.prevUpdatePosition) > 0) {
                this.prevUpdatePosition = this.position.clone();
                Celler.app.server.updateSightCoords(this.toModel());
            }
        };
        Sight.prototype.toModel = function () {
            return {
                Suit: Celler.Suit[this.suit],
                X: this.position.x,
                Y: this.position.y
            };
        };
        return Sight;
    })(Phaser.Sprite);
    Celler.Sight = Sight;
})(Celler || (Celler = {}));
//# sourceMappingURL=Sight.js.map