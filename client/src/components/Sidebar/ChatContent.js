import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: theme.spacing(1.25),
    flexGrow: 1
  },
  username: {
    fontWeight: "bold",
    letterSpacing: theme.spacing(-0.0125)
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17
  },
  unreadText: {
    fontSize: 14,
    fontWeight: 900,
    color: "#555555"
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessages } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={`${classes.previewText} ${
            unreadMessages > 0 && classes.unreadText
          }`}
        >
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
