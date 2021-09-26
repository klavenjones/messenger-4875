import React from "react";
import { Box, Typography, Avatar } from "@material-ui/core";
import { useOtherBubbleStyles } from "../../styles/ActiveChat";



const OtherUserBubble = (props) => {
  const classes = useOtherBubbleStyles();
  const { text, time, otherUser } = props;
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
