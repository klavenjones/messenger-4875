import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useChatContentStyles } from "../../styles";

const ChatContent = (props) => {
  const classes = useChatContentStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
