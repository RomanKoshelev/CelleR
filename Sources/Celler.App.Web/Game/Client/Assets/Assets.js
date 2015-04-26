var Celler;
(function (Celler) {
    var Assets;
    (function (Assets) {
        (function (Type) {
            Type[Type["Playground"] = 0] = "Playground";
            Type[Type["CellBody"] = 1] = "CellBody";
            Type[Type["CellEye"] = 2] = "CellEye";
            Type[Type["Sight"] = 3] = "Sight";
        })(Assets.Type || (Assets.Type = {}));
        var Type = Assets.Type;
        var Sprites = (function () {
            function Sprites() {
            }
            Sprites.getSpriteKey = function (suit, assetType) {
                return "" + assetType + "-" + suit;
            };
            Sprites.path = "/Game/Client/Assets/Sprites";
            return Sprites;
        })();
        Assets.Sprites = Sprites;
    })(Assets = Celler.Assets || (Celler.Assets = {}));
})(Celler || (Celler = {}));
//# sourceMappingURL=Assets.js.map