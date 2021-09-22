import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { useStyles } from "./styles/authPage";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.root}>
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
        <Grid container className={classes.navBar} item>
          <Typography className={classes.headerText}>
            Need to register?
          </Typography>
          <Button
            className={`${classes.button} ${classes.navButton}`}
            onClick={() => history.push("/register")}
          >
            Register
          </Button>
        </Grid>
        <Grid container className={classes.formContainer}>
          <Typography className={classes.formText}>Welcome Back!</Typography>
          <form onSubmit={handleLogin} className={classes.form}>
            <Grid>
              <Grid>
                <FormControl
                  margin="normal"
                  className={classes.formControl}
                  required
                >
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <FormControl
                className={classes.formControl}
                margin="normal"
                required
              >
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Grid>
                <Button
                  className={`${classes.button} ${classes.formButton}`}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
