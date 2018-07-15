import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  ListView,
  ListViewSection,
  ListViewRow,
  Text
} from 'react-desktop/macOs'

class MessageList extends Component {

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
}

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight
    }
}

  render() {
    return (
      <ListView>
        <ListViewSection>
          {this.props.messages.map((message, index) =>
            this.renderItem(message)
          )}
        </ListViewSection>
      </ListView>
    )
  }

  renderItem(message) {
    return (
      <ListViewRow key={message.id}>
        <Text color="white" size="13">
          {message.sender.name}:&ensp;
        </Text>
        <Text color="white" size="13">
          {message.text}
        </Text>
      </ListViewRow>
    )
  }
}

export default MessageList
