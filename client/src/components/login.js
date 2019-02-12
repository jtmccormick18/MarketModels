import React from "react";
import * as $ from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

const Form = props => (
    <Grid container justify="center">
        <form className="createAccountForm">
            <Typography align="center" variant="h4" color="inherit">
                Gwinnett County Market Modelling Audit Portal <br></br>

            </Typography>
            <Typography align="center" variant="h5" color="primary">
                Login

      </Typography>
            <Typography align="center" variant="caption" color="inherit">
                Access to this portal requires permission from Gwinnett County. If you need access please email josh.mccormick@gmass.net to start the process.

      </Typography>
            <hr />
            {props.isValid && <Typography align="center" variant="p" color="error">Incorrect Login! Please try again.</Typography>}

            <MenuItem>
                <span className="menuLabel">Username:</span>
                <input
                    className="menuitem"
                    type="text"
                    name="username"
                    value={props.userVal}
                    onChange={props.handleChange}
                />
            </MenuItem>
            <MenuItem>
                <span className="menuLabel">Password:</span>
                <input
                    className="menuitem"
                    type="password"
                    name="password"
                    value={props.passVal}
                    onChange={props.handleChange}
                />
            </MenuItem>
            <Button align="center" type="submit" onClick={props.submitUser}>
                Login
      </Button>
        </form>
    </Grid>
);

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        loggedIn: false,
        inValidLogin: false
    };

    //   componentDidUpdate = (prevProps, prevState) => {
    //     if (prevState.hasPartner !== this.state.hasPartner) {
    //      return  window.location.replace('/results');
    //     } else if (prevState.hasPartner === this.state.hasPartner && prevState.loggedIn !== this.state.loggedIn) {
    //      return window.location.replace('/partner');
    //     }
    //   }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.loggedIn !== this.state.loggedIn) {
            return window.location.replace('/ModelPortal')
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };
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
    render() {
        return (
            <div>

                <Form
                    handleChange={this.handleChange}
                    userVal={this.state.username}
                    passVal={this.state.password}
                    submitUser={this.loginUser}
                    isValid={this.state.inValidLogin}
                />
            </div>
        );
    }
}

export default Login;