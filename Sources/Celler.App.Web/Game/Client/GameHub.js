/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
var Celler;
(function (Celler) {
    // Code: Here: TS | GameHub.ts
    var GameHub = (function () {
        function GameHub() {
            this.discussion = $("#discussion");
            this.displayName = $("#displayname");
            this.message = $("#message");
            this.sendmessage = $("#sendmessage");
            this.gameHub = $.connection.gameHub;
            this.init();
        }
        GameHub.prototype.init = function () {
            var _this = this;
            this.gameHub.client.fromServer = function (msg) {
                _this.addNewMessageToPage(msg);
            };
            $.connection.hub.start().done(function () { return _this.onChatHubStarted(); });
        };
        GameHub.prototype.onChatHubStarted = function () {
            var _this = this;
            this.sendmessage.click(function () { return _this.onSendMessageClicked(); });
        };
        GameHub.prototype.onSendMessageClicked = function () {
            var msg = this.message.val();
            this.gameHub.server.toServer(msg);
            this.message.val("").focus();
        };
        GameHub.prototype.addNewMessageToPage = function (message) {
            this.discussion.append("<li>" + this.htmlEncode(message) + "</li>");
        };
        GameHub.prototype.htmlEncode = function (value) {
            return $("<div />").text(value).html();
        };
        return GameHub;
    })();
    Celler.GameHub = GameHub;
})(Celler || (Celler = {}));
//# sourceMappingURL=GameHub.js.map