import socket from './ws-client';
import {ChatForm, ChatList} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

class ChatApp {
    constructor() {
        this.ChatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.ChatList = new ChatList(LIST_SELECTOR, 'wonderwoman');

        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
          //let message = new ChatMessage({ message: 'pow!' });
          //socket.sendMessage(message.serialize());
          this.ChatForm.init((data) => {
            let message = new ChatMessage({message: data});
            socket.sendMessage(message.serialize());
          });
        });
        socket.registerMessageHandler((data) => {
          console.log(data);
          let message = new ChatMessage(data);
          this.ChatList.drawMessage(message.serialize());
        });
    }
}

class ChatMessage {
    constructor(data) {
       var {message: m, user: u = 'asif', timestamp: t = (new Date()).getTime() } = data;
        this.message = m;
        this.user = u;
        this.timestamp = t;
    }
    serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      }
    }
}

export default ChatApp;
