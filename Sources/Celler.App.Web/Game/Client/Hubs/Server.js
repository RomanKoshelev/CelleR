var Celler;
(function (Celler) {
    var Server = (function () {
        function Server() {
            this.onSightCoordsUpdated = new Phaser.Signal();
            this.client = $.connection.gameHub.client;
            this.server = $.connection.gameHub.server;
            this.ready = false;
            this.init();
        }
        Server.prototype.updateSightCoords = function (x, y) {
            if (this.ready) {
                this.server.updateSightCoords(x, y);
            }
        };
        Server.prototype.init = function () {
            var _this = this;
            this.client.sightCoordsUpdated = function (x, y) {
                _this.sightCoordsUpdated(x, y);
            };
            $.connection.hub.start().done(function () {
                _this.ready = true;
            });
        };
        Server.prototype.sightCoordsUpdated = function (x, y) {
            this.onSightCoordsUpdated.dispatch(x, y);
        };
        return Server;
    })();
    Celler.Server = Server;
})(Celler || (Celler = {}));
//# sourceMappingURL=Server.js.map