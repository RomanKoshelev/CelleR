var Celler;
(function (Celler) {
    var GameConnector = (function () {
        function GameConnector() {
            this.onSightCoordsUpdated = new Phaser.Signal();
            this.client = $.connection.gameHub.client;
            this.server = $.connection.gameHub.server;
            this.ready = false;
            this.init();
        }
        GameConnector.prototype.updateSightCoords = function (x, y) {
            if (this.ready) {
                this.server.updateSightCoords(x, y);
            }
        };
        GameConnector.prototype.init = function () {
            var _this = this;
            this.client.sightCoordsUpdated = function (x, y) {
                _this.sightCoordsUpdated(x, y);
            };
            $.connection.hub.start().done(function () {
                _this.ready = true;
            });
        };
        GameConnector.prototype.sightCoordsUpdated = function (x, y) {
            this.onSightCoordsUpdated.dispatch(x, y);
        };
        return GameConnector;
    })();
    Celler.GameConnector = GameConnector;
})(Celler || (Celler = {}));
//# sourceMappingURL=GameConnector.js.map