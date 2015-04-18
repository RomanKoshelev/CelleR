/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
var App;
(function (App) {
    var GameView = (function () {
        function GameView() {
            this.discussion = $("#discussion");
            this.displayName = $("#displayname");
            this.message = $("#message");
            this.sendmessage = $("#sendmessage");
            this.gameHub = $.connection.gameHub;
            this.init();
        }
        GameView.prototype.init = function () {
            var _this = this;
            this.gameHub.client.fromServer = function (msg) {
                _this.addNewMessageToPage(msg);
            };
            $.connection.hub.start().done(function () { return _this.onChatHubStarted(); });
        };
        GameView.prototype.onChatHubStarted = function () {
            var _this = this;
            this.sendmessage.click(function () { return _this.onSendMessageClicked(); });
        };
        GameView.prototype.onSendMessageClicked = function () {
            var msg = this.message.val();
            this.gameHub.server.toServer(msg);
            this.message.val("").focus();
        };
        GameView.prototype.addNewMessageToPage = function (message) {
            this.discussion.append("<li>" + this.htmlEncode(message) + "</li>");
        };
        GameView.prototype.htmlEncode = function (value) {
            return $("<div />").text(value).html();
        };
        return GameView;
    })();
    App.GameView = GameView;
    var gameView;
    function initGame() {
        gameView = new GameView();
    }
    App.initGame = initGame;
})(App || (App = {}));
$(function () {
    App.initGame();
});
//# sourceMappingURL=GameHub.js.map