import React from "react";
import { useSenderBubbleStyles } from "../../styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const SenderBubble = ({ time, message, lastRead, otherUser }) => {
  const classes = useSenderBubbleStyles();
  
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{message.text}</Typography>
      </Box>
      {lastRead && (
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
