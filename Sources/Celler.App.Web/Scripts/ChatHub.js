/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/signalr/signalr.d.ts" />
var App;
(function (App) {
    var ChatView = (function () {
        function ChatView() {
            this.discussion = $("#discussion");
            this.displayName = $("#displayname");
            this.message = $("#message");
            this.sendmessage = $("#sendmessage");
            this.chatHub = $.connection.chatHub;
            this.init();
        }
        ChatView.prototype.init = function () {
            var _this = this;
            this.askName();
            this.chatHub.client.addNewMessageToPage = function (msg) {
                _this.addNewMessageToPage(msg);
            };
            $.connection.hub.start().done(function () { return _this.onChatHubStarted(); });
        };
        ChatView.prototype.onChatHubStarted = function () {
            var _this = this;
            this.sendmessage.click(function () { return _this.onSendMessageClicked(); });
        };
        ChatView.prototype.onSendMessageClicked = function () {
            var msg = {
                Name: this.displayName.val(),
                Message: this.message.val()
            };
            this.chatHub.server.send(msg);
            this.message.val("").focus();
        };
        ChatView.prototype.askName = function () {
            var name = prompt("Enter your name:", "User");
            this.displayName.val(name);
            this.message.focus();
        };
        ChatView.prototype.addNewMessageToPage = function (message) {
            this.discussion.append("<li><strong>" + this.htmlEncode(message.Name) + "</strong>: " + this.htmlEncode(message.Message) + "</li>");
        };
        ChatView.prototype.htmlEncode = function (value) {
            return $("<div />").text(value).html();
        };
        ChatView.prototype.onServerMessage = function (msg) {
            this.addNewMessageToPage({
                Name: "Server",
                Message: msg
            });
        };
        return ChatView;
    })();
    App.ChatView = ChatView;
    var chatView;
    function init() {
        chatView = new ChatView();
    }
    App.init = init;
})(App || (App = {}));
$(function () {
    App.init();
});
//# sourceMappingURL=ChatHub.js.map