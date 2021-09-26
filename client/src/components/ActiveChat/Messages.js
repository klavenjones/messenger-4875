import React, { useEffect, useState } from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 6
  }
}));

const Messages = (props) => {
  const [lastRead, setLastRead] = useState();
  const { messages, otherUser, userId } = props;
  const classes = useStyles();

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
    console.log("FIRED");
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
