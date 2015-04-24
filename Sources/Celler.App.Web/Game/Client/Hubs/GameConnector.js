var Celler;
(function (Celler) {
    var GameConnector = (function () {
        function GameConnector() {
            this.onFromServer = new Phaser.Signal();
            this.client = $.connection.gameHub.client;
            this.server = $.connection.gameHub.server;
            this.init();
        }
        GameConnector.prototype.sendMessageToServer = function (msg) {
            this.server.toServer(msg);
        };
        GameConnector.prototype.init = function () {
            var _this = this;
            this.client.fromServer = function (msg) {
                _this.dispatchSignalOnFromServer(msg);
            };
            $.connection.hub.start();
        };
        GameConnector.prototype.dispatchSignalOnFromServer = function (msg) {
            this.onFromServer.dispatch(msg);
        };
        return GameConnector;
    })();
    Celler.GameConnector = GameConnector;
})(Celler || (Celler = {}));
//# sourceMappingURL=GameConnector.js.map