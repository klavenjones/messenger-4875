import React from "react";
import { useSenderBubbleStyles } from "../../styles/ActiveChat";
import { Box, Typography } from "@material-ui/core";

const SenderBubble = (props) => {
  const classes = useSenderBubbleStyles();
  const { time, text } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SenderBubble;
