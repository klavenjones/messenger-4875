import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const [lastReadId, setLastRead] = useState(null);
  const { messages, otherUser, userId } = props;
  console.log("PROPS", props);
  //Setting last read
  useEffect(() => {
    let lastMessageId;
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].senderId === props.userId) {
        console.log(props.messages[i].read);
        if (props.messages[i].read) {
          lastMessageId = props.messages[i].id;
        }
      }
    }
    setLastRead(lastMessageId);
  }, [props]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <>
            <SenderBubble key={message.id} text={message.text} time={time} />
            {message.id === lastReadId && <h1>READ</h1>}
          </>
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
