/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/signalr/signalr.d.ts"/>
$(function () {
    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.chatHub;
    // Create a function that the hub can call back to display messages.
    chat.client.addNewMessageToPage = function (message) {
        // Add the message to the page.
        $('#discussion').append('<li><strong>' + htmlEncode(message.Name) + '</strong>: ' + htmlEncode(message.Message) + '</li>');
    };
    // Get the user name and store it to prepend to messages.
    $('#displayname').val(prompt('Enter your name:', ''));
    // Set initial focus to message input box.
    $('#message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {
            // Call the Send method on the hub.
            //chat.server.send($('#displayname').valmessage').val());
            chat.server.send({
                Name: $('#displayname').val(),
                Message: $('#message').val()
            });
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });
    });
});
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
//# sourceMappingURL=ChatHub.js.map