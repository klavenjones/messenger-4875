import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [lastRead, setLastRead] = useState({
    isShowing: false,
    messageId: null
  });


  
  const checkLastReadMessage = (message) => {
    const { isShowing } = lastRead;
    if (!isShowing && message.read && message.senderId === userId) {
      setLastRead({ isShowing: true, messageId: message.id });
    }
  };

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        checkLastReadMessage(message);

        return message.senderId === userId ? (
          <Box key={message.id}>
            <SenderBubble
              message={message}
              time={time}
              lastRead={lastRead.messageId === message.id}
              otherUser={otherUser}
            />
          </Box>
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
