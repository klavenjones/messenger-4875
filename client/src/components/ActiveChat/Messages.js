import React, { useEffect, useState } from "react";
import { Box, Avatar } from "@material-ui/core";
import { useMessageStyles } from "../../styles/ActiveChat";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";



const Messages = (props) => {
  const [lastRead, setLastRead] = useState();
  const { messages, otherUser, userId } = props;
  const classes = useMessageStyles();

  useEffect(() => {
    let index;
    const length = props.messages.length;
    for (let i = 0; i < length; i++) {
      if (props.messages[i].senderId === props.userId) {
        if (props.messages[i].read) {
          index = props.messages[i].id;
        }
      }
    }
    setLastRead(index);
  }, [props]);

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
