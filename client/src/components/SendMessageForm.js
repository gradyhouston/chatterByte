import React, { Component } from 'react'
// import { Button, TextInput } from 'react-desktop/macOs'
import 'materialize-css/dist/css/materialize.css';


class SendMessageForm extends Component {
  state = {
    text: ''
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSend(this.state.text)
    this.setState({ text: '' })
  }

  onChange = e => {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
    return (
      <div className="send-message-form-container" ref={el => this.props.setRef(el)} >
        <form onSubmit={this.onSubmit} className="send-message-form">
          <div className="input-field col s6">
          <input className="message-input"
            placeholder="Say something..."
            type="text"
            onChange={this.onChange}
            value={this.state.text}
          />
        </div>
          <button color="blue" height="50px" type="submit">
            Send
          </button>
        </form>
      </div>
    )
  }
}

export default SendMessageForm
