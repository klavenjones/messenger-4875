import React from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { setActiveChat } from "../../store/activeConversation";
import { markAsRead } from "../../store/utils/thunkCreators";
import { useChatStyles } from "../../styles";
import { connect } from "react-redux";

const Chat = (props) => {
  const classes = useChatStyles();
  const { conversation, setActiveChat, markAsRead } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    try {
      await Promise.all([
        setActiveChat(conversation.otherUser.username),
        markAsRead(conversation.id, otherUser.id)
      ]);
    } catch (error) {
      console.error(error);
    }
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

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markAsRead: (convoId, senderId) => {
      dispatch(markAsRead(convoId, senderId));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
