import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useAuthStyles } from "./styles/AuthPage";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

const Login = (props) => {
  const history = useHistory();
  const classes = useAuthStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Box className={classes.leftColumn}>
        <Grid className={classes.introIcon}>
          <img src="/img/bubble.svg" alt="Bubble Icon" />
        </Grid>
        <Grid>
          <Typography className={classes.introText}>
            Converse with anyone with any language.
          </Typography>
        </Grid>
      </Box>
      <Box className={classes.rightColumn}>
        <Grid container item className={classes.navBar}>
          <Typography className={classes.headerText}>
            Need to log in?
          </Typography>
          <Button
            className={`${classes.button} ${classes.navButton}`}
            onClick={() => history.push("/login")}
          >
            Log In
          </Button>
        </Grid>
        <Grid container className={classes.formContainer}>
          <Typography className={classes.formText}>
            Create an account
          </Typography>
          <form onSubmit={handleRegister} className={classes.form}>
            <Grid>
              <Grid>
                <FormControl className={classes.formControl}>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  className={classes.formControl}
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  className={classes.formControl}
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid className={classes.formButtonContainer}>
                <Button
                  className={`${classes.button} ${classes.formButton}`}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
