import { makeStyles } from "@material-ui/core";

export const useHomeStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  logout: {
    textTransform: "none",
    letterSpacing: 0,
    margin: "40px 0 60px 20px",
    fontWeight: "bold",
    fontSize: "18px",
    height: "56px",
    width: "170px",
    boxShadow: "0 0 8px 0 rgba(0 0 0 / 20%)"
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
