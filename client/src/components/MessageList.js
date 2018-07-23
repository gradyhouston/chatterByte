import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.css';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';

import {
  ListView,
  ListViewSection,
  ListViewRow,
  Text
} from 'react-desktop/macOs'
// import Home from '/components/Home.js'

class MessageList extends Component {

//   componentWillUpdate() {
//
// }



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
