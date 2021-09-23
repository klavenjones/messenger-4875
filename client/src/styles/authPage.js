import { makeStyles } from "@material-ui/core/styles";
import zIndex from "@material-ui/core/styles/zIndex";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    alignItems: "center",
    justifyContent: "center"
  },
  leftColumn: {
    backgroundImage:
      "linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url('/img/bg-img.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gridColumn: "span 5/span 5"
  },
  introIcon: {
    marginTop: -200,
    marginBottom: 50,
    "& img": {
      width: 100,
      height: 100
    }
  },
  introText: {
    fontSize: 28,
    color: "white",
    textAlign: "center",
    maxWidth: 350
  },
  rightColumn: {
    backgroundColor: "white",
    gridColumn: "span 7/span 7"
  },
  navBar: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    padding: "30px 40px",
    position: "fixed",
    top: 10,
    right: 0,
    zIndex: 10
  },
  button: {
    textTransform: "none",
    letterSpacing: 0,
    fontWeight: "bold",
    fontSize: "18px",
    height: "56px",
    width: "170px",
    boxShadow: "0 0 8px 0 rgba(0 0 0 / 20%)"
  },
  headerText: {
    color: "#888888",
    marginRight: 30
  },
  formText: {
    color: "#000",
    fontSize: 26,
    marginBottom: 40
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center"
  },
  form: {
    width: 480,
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    width: "100%",
    marginBottom: 40,
    "& input": {
      width: "100%"
    }
  },
  navButton: {
    color: "#3A8DFF"
  },
  formButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 20
  },
  formButton: {
    color: "white",
    backgroundColor: "#3A8DFF",
    "&:hover": {
      backgroundColor: "#86B9FF"
    }
  }
}));
