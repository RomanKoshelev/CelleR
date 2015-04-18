/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
module App {

    export class ChatView {
        private discussion = $( "#discussion" );
        private displayName = $( "#displayname" );
        private message = $( "#message" );
        private sendmessage = $( "#sendmessage" );
        private chatHub = $.connection.chatHub;

        constructor() {
            this.init();
        }

        private init(): void {
            this.askName();
            this.chatHub.client.addNewMessageToPage = ( msg: ChatMessage ) => { this.addNewMessageToPage( msg ); };
            $.connection.hub.start().done( () => this.onChatHubStarted() );
        }

        private onChatHubStarted(): void {
            this.sendmessage.click( () => this.onSendMessageClicked() );
        }

        private onSendMessageClicked(): void {
            var msg = {
                Name: this.displayName.val(),
                Message: this.message.val()

            };
            this.chatHub.server.send( msg );
            this.message.val( "" ).focus();
        }

        private askName(): void {
            var name = prompt( "Enter your name:", "User" );
            this.displayName.val( name );
            this.message.focus();
        }

        private addNewMessageToPage( message: ChatMessage ): void {
            this.discussion.append(
                `<li><strong>${this.htmlEncode( message.Name ) }</strong>: ${this.htmlEncode( message.Message ) }</li>`
            );
        }

        htmlEncode( value: string ) {
            return $( "<div />" ).text( value ).html();
        }

        onServerMessage( msg: string ) {
            this.addNewMessageToPage( {
                Name: "Server",
                Message: msg
            } );
        }
    }

    var chatView: ChatView;

    export function init() {
        chatView = new ChatView();
    }
}


$( () => {
    App.init();
} );