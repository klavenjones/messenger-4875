import { makeStyles } from "@material-ui/core/styles";

export const useAvatarStyles = makeStyles((theme) => ({
  profilePic: {
    height: theme.spacing(2.75),
    width: theme.spacing(2.75)
  },
  badge: {
    height: theme.spacing(0.8125),
    width: theme.spacing(0.8125),
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "#D0DAE9"
  },
  online: {
    backgroundColor: "#1CED84"
  },
  sidebar: {
    marginLeft: theme.spacing(1.0625)
  }
}));

export const useChatStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(5),
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: theme.spacing(0.625),
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  badge: {
    width: theme.spacing(2.1875),
    borderRadius: "100%",
    padding: "10px 15px",
    background: "#3F92FF",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
