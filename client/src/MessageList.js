import React, { Component } from 'react'
import {
  ListView,
  ListViewSection,
  ListViewRow,
  Text
} from 'react-desktop/macOs'

class MessageList extends Component {
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
