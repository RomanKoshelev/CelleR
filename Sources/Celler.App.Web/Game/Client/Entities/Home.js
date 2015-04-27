var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Celler;
(function (Celler) {
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home(game, suit, size) {
            _super.call(this, game, 0, 0, Celler.Assets.Sprites.getSpriteKey(suit, 3 /* Home */));
            this.scale.set(size / this.width);
            this.anchor.set(0.5);
        }
        return Home;
    })(Phaser.Sprite);
    Celler.Home = Home;
})(Celler || (Celler = {}));
//# sourceMappingURL=Home.js.map