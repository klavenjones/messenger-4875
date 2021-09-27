import React, { useEffect, useState } from "react";
import { Box, Avatar } from "@material-ui/core";
import { useMessageStyles } from "../../styles/ActiveChat";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, lastRead } = props;
  const classes = useMessageStyles();

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <div key={message.id} className={classes.root}>
            <SenderBubble text={message.text} time={time} />
            {message.id === lastRead && (
              <Avatar
                alt={otherUser.username}
                src={otherUser.photoUrl}
                className={classes.avatar}
              ></Avatar>
            )}
          </div>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
