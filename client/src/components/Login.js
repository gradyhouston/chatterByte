// import React from "react";
// import PropTypes from "prop-types";
//
// const Login = props => (
//   <nav className="login">
//     <h2>ChatterByte Login</h2>
//     <p>Sign in to start your chat adventure!</p>
//     <button className="github" onClick={() => props.authenticate("Github")}>
//       Log In With GitHub
//     </button>
//     <button className="facebook" onClick={() => props.authenticate("Facebook")}>
//       Log In With Facebook
//     </button>
//   </nav>
// );
// Login.propTypes = {
//   authenticate: PropTypes.func.isRequired
// };
// export default Login;

import React, { Component } from 'react'
import { login, resetPassword } from './auth'
// import PropTypes from 'prop-types';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import InputLabel from '@material-ui/core/InputLabel';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3 login-form">
        {/* <h4> Login </h4> */}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a href="null" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
          }
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div className="footer">
          &copy;2018 Grady Houston
        </div>
      </div>
    )
  }
}
