import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as $ from 'axios';
import { BrowserRouter, Link, Route, Switch, NavLink } from 'react-router-dom';
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import Login from './components/login';
import { AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import SimpleSelect from './components/select';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { install } from '@material-ui/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class App extends React.Component {

  state = {
    NeighbHoodCode: [],
    username: "",
    password: "",
    loggedIn: false,
    inValidLogin: false
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  childHandler = (ChildState) => {
    console.log(ChildState.loggedIn)
    this.setState({
      loggedIn: ChildState.loggedIn,
    })
  }
  loginUser = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    $.post("/api/login", userData)
      .then(resp => {

        this.setState({ loggedIn: true });
        localStorage.token = resp.data.token;
        localStorage.gwinnettMM_id = resp.data.id;
        localStorage.gwinnettMM_username = resp.data.username;
      })
  }

  handleClick = (event) => {
    event.preventDefault();
    $.post('/api/notes', { content: this.state.newNote })
      .then((result) => {
        console.log(result.data);
      })
  }

  componentDidMount() {
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Link to='/'><IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <img alt="LMClogo" src="././assets/GMASS.png" height="100px" /></IconButton>
                </Link>
                <Typography variant="h6" color="inherit" className={`${classes.grow} ${classes.title}`}>
                  Market Modelling
              </Typography>
                {!localStorage.token ? (
                  <div>
                    <NavLink to='/login'><Button color="inherit">Login</Button></NavLink>
                    <NavLink to="/register"><Button color="inherit">Register</Button></NavLink>
                    <NavLink to="/about"><Button color="inherit">About Us</Button></NavLink> </div>) :
                  (<div>
                    <NavLink to="/"><Button color="inherit" onClick={this.logout}>Logout</Button></NavLink>
                  </div>)
                }
              </Toolbar>
            </AppBar>
            <Switch>
              <Route exact path='/' component={() => <Login action={this.childHandler} />} />
              <Route exact path='/ModelPortal' component={SimpleSelect} />
              <Route path='*' component={() => <Login action={this.childHandler} />} />
            </Switch>
            {/* {!this.state.loggedIn ? (<Login />) : (<div>
          <SimpleSelect />
        </div>
        )} */}
          </div>

        </BrowserRouter>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);