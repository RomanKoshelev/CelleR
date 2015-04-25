var Celler;
(function (Celler) {
    var ServerAdapter = (function () {
        function ServerAdapter() {
            this.onSightCoordsUpdated = new Phaser.Signal();
            this.client = $.connection.gameHub.client;
            this.server = $.connection.gameHub.server;
            this.ready = false;
            this.init();
        }
        ServerAdapter.prototype.updateSightCoords = function (sight) {
            if (this.ready) {
                this.server.updateSightCoords(sight);
            }
        };
        ServerAdapter.prototype.init = function () {
            var _this = this;
            this.client.sightCoordsUpdated = function (sight) {
                _this.sightCoordsUpdated(sight);
            };
            $.connection.hub.start().done(function () {
                _this.ready = true;
            });
        };
        ServerAdapter.prototype.sightCoordsUpdated = function (sight) {
            this.onSightCoordsUpdated.dispatch(sight);
        };
        return ServerAdapter;
    })();
    Celler.ServerAdapter = ServerAdapter;
})(Celler || (Celler = {}));
//# sourceMappingURL=ServerAdapter.js.map