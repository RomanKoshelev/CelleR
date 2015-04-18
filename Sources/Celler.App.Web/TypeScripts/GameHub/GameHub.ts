/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
module App {

    export class GameView {
        private discussion = $( "#discussion" );
        private displayName = $( "#displayname" );
        private message = $( "#message" );
        private sendmessage = $( "#sendmessage" );
        private gameHub = $.connection.gameHub;

        constructor() {
            this.init();
        }

        private init(): void {
            this.gameHub.client.fromServer = ( msg: string ) => { this.addNewMessageToPage( msg ); };
            $.connection.hub.start().done( () => this.onChatHubStarted() );
        }

        private onChatHubStarted(): void {
            this.sendmessage.click( () => this.onSendMessageClicked() );
        }

        private onSendMessageClicked(): void {
            var msg = this.message.val();
            this.gameHub.server.toServer( msg );
            this.message.val( "" ).focus();
        }

        private addNewMessageToPage( message: string ): void {
            this.discussion.append(
                `<li>${this.htmlEncode( message ) }</li>`
            );
        }

        htmlEncode( value: string ) {
            return $( "<div />" ).text( value ).html();
        }
    }

    var gameView: GameView;

    export function initGame() {
        gameView = new GameView();
    }
}


$( () => {
    App.initGame();
} );