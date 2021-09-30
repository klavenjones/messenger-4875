import { makeStyles } from "@material-ui/core/styles";

export const useAvatarStyles = makeStyles(() => ({
  profilePic: {
    height: 44,
    width: 44
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "#D0DAE9"
  },
  online: {
    backgroundColor: "#1CED84"
  },
  sidebar: {
    marginLeft: 17
  }
}));

export const useChatStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  badge: {
    width: 35,
    borderRadius: "100%",
    padding: "10px 15px",
    background: "#3F92FF",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
