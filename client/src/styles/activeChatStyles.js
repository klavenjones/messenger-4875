import { makeStyles } from "@material-ui/core/styles";

export const useActiveChatStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: theme.spacing(0.5),
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    display: "flex",
    flexDirection: "column",
    flexGrow: theme.spacing(16),
    justifyContent: "space-between"
  }
}));

export const useInputStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: theme.spacing(0.9375)
  },
  input: {
    height: theme.spacing(4.375),
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: theme.spacing(1.25)
  }
}));

export const useOtherBubbleStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(0.6875),
    marginTop: theme.spacing(0.375)
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: theme.spacing(0.3125)
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: theme.spacing(0.5)
  }
}));

export const useMessageStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  }
}));

export const useSenderBubbleStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: theme.spacing(0.3125)
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: theme.spacing(0.5),
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(0.0625),
    marginTop: theme.spacing(0.0625),
    marginBottom: theme.spacing(0.375)
  }
}));

export const useHeaderStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 89,
    marginBottom: theme.spacing(2.125),
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)"
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(1.5)
  },
  username: {
    fontSize: 20,
    letterSpacing: -29,
    fontWeight: "bold",
    marginRight: theme.spacing(0.875)
  },
  statusText: {
    fontSize: 12,
    color: "#BFC9DB",
    letterSpacing: theme.spacing(0.010625)
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: "50%",
    marginRight: theme.spacing(0.3125),
    backgroundColor: "#D0DAE9"
  },
  online: {
    background: "#1CED84"
  },
  ellipsis: {
    color: "#95A7C4",
    marginRight: theme.spacing(1.5),
    opacity: 0.5
  }
}));
