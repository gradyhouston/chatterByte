// import React from 'react'
// import ReactDOM from 'react-dom'
import App from './App'
// import firebase from 'firebase/app'
import React, { Component } from 'react'
import 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore'
// import '../index.css'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'materialize-css/dist/css/materialize.css';
// import Button from '@material-ui/core/Button';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
// import Dashboard from './Dashboard'
// import UsernameForm from './UsernameForm'
import { logout } from './auth'
import { firebaseAuth } from './constants'
// import { TextInput } from 'react-desktop/macOs'
// import { Button } from 'react-desktop/macOs'
// import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem } from 'react-desktop/macOs';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/Dashboard' />}
    />
  )
}

export default class Main extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }


  render() {
    return this.state.loading === true ? <h4>Loading</h4> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header center">
              </div>
              <ul className="nav navbar-nav center">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                  <Link to="/Dashboard" className="navbar-brand">Dashboard</Link>
                </li>
                <li>
                  <Link to="/register" className="navbar-brand">Register</Link>
              </li>
                <li>
                  {this.state.authed
                    ? <button className="logout-button"
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand-logout">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                      </span>}
                </li>

              </ul>
            </div>
          </nav>
          {/* <TitleBar>
        <Toolbar>
          <ToolbarNav>
            <ToolbarNavItem
              title="Home"
              selected={this.state.selected === Home}
              onClick={() => history.push('/')}>Home<
            />
            <ToolbarNavItem
              title="Dashboard"
              selected={this.state.selected === 2}
              onClick={() => this.setState({ selected: 2 })}
            />
            <ToolbarNavItem
              title="Login"
              selected={this.state.selected === 3}
              onClick={() => this.setState({ selected: 3 })}
            />
            <ToolbarNavItem
              title="Register"
              selected={this.state.selected === 4}
              onClick={() => this.setState({ selected: 4 })}
            />
          </ToolbarNav>
        </Toolbar>
      </TitleBar> */}
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/Dashboard' component={App} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
