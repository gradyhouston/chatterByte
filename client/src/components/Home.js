import React, { Component } from 'react';
import chatterbytelogo from './chatterbytelogo.svg';
// chatterByte/client/public/images/chatterbytelogorecolor.svg
export default class Home extends Component {
  render () {
    return (
      <div className="home-welcome">
        <img src={chatterbytelogo} className="logo" alt="ChatterByte Logo" />
          <h5><p className="home-register-text">Register. Pick a username. Chat.</p></h5>
            {/* <p className="home-username-text">Pick a username.</p>
              <p className="home-chat-text">Chat.</p></h5> */}
              <div className="footer">
                &copy;2018 Grady Houston
              </div>

      </div>
    )
  }
}
