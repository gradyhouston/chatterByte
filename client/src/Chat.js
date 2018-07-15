import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import OnlineList from './OnlineList';

import { tokenUrl, instanceLocator } from './config'

class Chat extends Component {
  state = {
    currentUser: null,
    currentRoom: {},
    messages: []
  }

  componentDidMount() {
    const chatkit = new ChatManager({
      instanceLocator,
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    })

    chatkit
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })

        return currentUser.subscribeToRoom({
          roomId: 11533419,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        })
      })
      .then(currentRoom => {
        console.log('currentRoom', currentRoom)
        this.setState({ currentRoom })
      })
      .catch(error => console.error('error', error))
  }

  onSend = text => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
  }



  // componentWillUpdate(nextProps) {
  //   this.messagesChanged = nextProps.messages.length !== this.props.messages.length;
  //     if (this.messagesChanged) {
  //       const { messageList } = this.refs;
  //       const scrollPos = messageList.scrollTop;
  //       const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
  //       this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
  //     if (!this.scrollAtBottom) {
  //       const numMessages = messageList.childNodes.length;
  //       this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
  //     }
  //   }
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (this.messagesChanged) {
  //     if (this.scrollAtBottom) {
  //       this.scrollToBottom();
  //     }
  //   if (this.topMessage) {
  //       ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
  //     }
  //   }
  // }

  render() {
    return (
      <div className="wrapper">
        <div>
          <OnlineList
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
        </div>
        <div className="chat">
          <MessageList messages={this.state.messages} />
          <SendMessageForm onSend={this.onSend} />
        </div>
      </div>
    )
  }
}

export default Chat
