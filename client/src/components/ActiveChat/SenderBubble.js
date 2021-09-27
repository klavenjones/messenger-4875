import React, { useEffect } from "react";
import { useSenderBubbleStyles } from "../../styles/ActiveChat";
import { Box, Typography, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setLastReadMessage } from "../../store/conversations";

const SenderBubble = (props) => {
  const classes = useSenderBubbleStyles();
  const { time, otherUser, message, lastRead } = props;

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{message.text}</Typography>
      </Box>
      {message.id === lastRead && (
        <Avatar
          alt={otherUser.username}
          src={otherUser.photoUrl}
          className={classes.avatar}
        ></Avatar>
      )}
    </Box>
  );
};

export default SenderBubble;
