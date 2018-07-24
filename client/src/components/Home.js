import React, { Component } from 'react';
import chatterbytelogo from './chatterbytelogo.svg';
// chatterByte/client/public/images/chatterbytelogorecolor.svg
export default class Home extends Component {
  render () {
    return (
      <div className="home-welcome">
        <img src={chatterbytelogo} className="logo" alt="ChatterByte Logo" />
          <h5><p>Register.</p>
            <p>Pick a username.</p>
              <p>Chat.</p></h5>
              <div className="footer">
                &copy;2018 Grady Houston
              </div>

      </div>
    )
  }
}
