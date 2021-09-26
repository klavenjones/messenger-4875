import React from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { useChatStyles } from "../../styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect, useDispatch } from "react-redux";
import { setReadMessages } from "../../store/utils/thunkCreators";

const Chat = (props) => {
  const classes = useChatStyles();
  const dispatch = useDispatch();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    if (conversation.unreadMessages > 0) {
      await dispatch(setReadMessages(conversation));
    }

    dispatch(setActiveChat(conversation.otherUser.username));
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {conversation.unreadMessages > 0 && (
        <Badge className={classes.badge}>{conversation.unreadMessages}</Badge>
      )}
    </Box>
  );
};

export default connect(null)(Chat);
