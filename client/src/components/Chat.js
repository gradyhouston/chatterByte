import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import OnlineList from './OnlineList';
import * as _ from 'lodash';
import { tokenUrl, instanceLocator, key } from './config'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentRoom: {},
            messages: []
        }
        this.setRef = this.setRef.bind(this);
        this.scrollToBottom = _.debounce(this.scrollToBottom, 100, false);
    }

    componentDidMount() {
        const chatkit = new ChatManager({
            instanceLocator,
            userId: this.props.currentId,
            key: key,
            tokenProvider: new TokenProvider({
                url: tokenUrl
            })
        })

        chatkit
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })

                return currentUser.subscribeToRoom({
                    roomId: "19450556",
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.messages.length !== this.state.messages.length) {
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        if (this.el !== undefined) {
            this.el.scrollIntoView({ behavior: "smooth" });
        }
    }

    setRef(el) {
        this.el = el;
    }



    render() {
        return ( <
            div className = "wrapper" >
            <
            div >
            <
            OnlineList currentUser = { this.state.currentUser }
            users = { this.state.currentRoom.users }
            /> < /
            div > <
            div className = "chat" >
            <
            MessageList messages = { this.state.messages }
            /> <
            SendMessageForm onSend = { this.onSend }
            setRef = { this.setRef }
            /> < /
            div > <
            /div>
        )
    }
}

export default Chat