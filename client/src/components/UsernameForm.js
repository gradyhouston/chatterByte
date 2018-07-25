import React, { Component } from 'react'
// import { TextInput } from 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/css/materialize.css';
// import PropTypes from 'prop-types';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import InputLabel from '@material-ui/core/InputLabel';
// import { TextInput } from 'bootstrap/dist/css/bootstrap.css';
// import { Button } from 'bootstrap/dist/css/bootstrap.css';
// import { TextInput } from 'react-desktop/macOs'
// import { Button } from 'react-desktop/macOs'
// import firebase from "firebase";
// import Login from "./Login";
// import base, { firebaseApp } from "../base";


class UsernameForm extends Component {
  constructor() {
    super()
    this.state = {
      username: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state.username)
  }

  handleChange = e => {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div className="username-form">
        <form onSubmit={this.handleSubmit}>
          <h3 className="usernameform-welcome">Welcome to ChatterByte</h3>
          <div>
            <div className="row">
              <div className="input-field col s12">
                {/* <input placeholder="Type in a username" id="first_name" type="text" value={this.state.username} */}
                {/* onChange={this.handleChange} className="validate" /> */}
                <input type="text" className="usernameform-control" value={this.state.username} onChange={this.handleChange}id="nameField" name="nameField" placeholder="Enter a username (no spaces or special characters)" required />
                  {/* <label htmlFor="first_name"></label> */}
                </div>
                <p className="usernameform-message">
                   However, numbers are fine  ¯\_(ツ)_/¯
                </p>
              </div>

          </div>
          <div>
            <button className="btn" type="submit" name="action">Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UsernameForm
