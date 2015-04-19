var Celler;
(function (Celler) {
    var GameConnector = (function () {
        function GameConnector() {
            this.discussion = $("#discussion");
            this.displayName = $("#displayname");
            this.message = $("#message");
            this.sendmessage = $("#sendmessage");
            this.hub = $.connection.gameHub;
            this.init();
        }
        GameConnector.prototype.toServer = function (msg) {
            this.hub.server.toServer(msg);
        };
        GameConnector.prototype.init = function () {
            var _this = this;
            this.hub.client.fromServer = function (msg) {
                _this.addNewMessageToPage(msg);
            };
            $.connection.hub.start().done(function () { return _this.onChatHubStarted(); });
        };
        GameConnector.prototype.onChatHubStarted = function () {
            var _this = this;
            this.sendmessage.click(function () { return _this.onSendMessageClicked(); });
        };
        GameConnector.prototype.onSendMessageClicked = function () {
            var msg = this.message.val();
            this.hub.server.toServer(msg);
            this.message.val("").focus();
        };
        GameConnector.prototype.addNewMessageToPage = function (message) {
            this.discussion.append("<li>" + this.htmlEncode(message) + "</li>");
        };
        GameConnector.prototype.htmlEncode = function (value) {
            return $("<div />").text(value).html();
        };
        return GameConnector;
    })();
    Celler.GameConnector = GameConnector;
})(Celler || (Celler = {}));
//# sourceMappingURL=GameConnector.js.map