module Celler  {
    export class GameConnector {
        private discussion = $( "#discussion" );
        private displayName = $( "#displayname" );
        private message = $( "#message" );
        private sendmessage = $( "#sendmessage" );
        private hub = $.connection.gameHub;

        constructor() {
            this.init();
        }

        toServer(msg: string): void {
            this.hub.server.toServer( msg );
        }

        private init(): void {
            this.hub.client.fromServer = ( msg: string ) => { this.addNewMessageToPage( msg ); };
            $.connection.hub.start().done( () => this.onChatHubStarted() );
        }

        private onChatHubStarted(): void {
            this.sendmessage.click( () => this.onSendMessageClicked() );
        }

        private onSendMessageClicked(): void {
            var msg = this.message.val();
            this.hub.server.toServer( msg );
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
}
