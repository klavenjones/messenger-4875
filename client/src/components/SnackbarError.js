import React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { useErrorStyles } from "../styles";
import Close from "@material-ui/icons/Close";


const SnackbarError = (props) => {
  const classes = useErrorStyles();
  return (
    <Snackbar
      open={props.snackBarOpen}
      onClose={() => props.setSnackBarOpen(false)}
      message={
        props.errorMessage || "Sorry, an error occured. Please try again"
      }
      action={
        <React.Fragment>
          <Button
            className={classes.icon}
            size="small"
            onClick={() => props.setSnackBarOpen(false)}
          >
            <Close color="secondary" />
          </Button>
        </React.Fragment>
      }
      ContentProps={{
        classes: {
          root: classes.snackbar
        }
      }}
    />
  );
};

export default SnackbarError;
