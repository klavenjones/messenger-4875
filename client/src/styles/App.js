import { makeStyles } from "@material-ui/core";

export const useHomeStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  }
}));
export const useErrorStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: "red",
    fontWeight: "bold"
  },
  icon: {
    color: "white"
  }
}));
