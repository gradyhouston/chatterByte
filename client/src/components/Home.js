import React, { Component } from 'react';
import chatterbyteLogoRecolor from './chatterbyteLogoRecolor.svg';

export default class Home extends Component {
  render () {
    return (
      <div className="home-welcome">
        <img src={chatterbyteLogoRecolor} height="87" width="704" alt="ChatterByte Logo" />
        {/* <h4>ChatterByte</h4> */}
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
