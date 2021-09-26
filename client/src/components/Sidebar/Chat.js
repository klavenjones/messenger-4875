import React from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect, useDispatch } from "react-redux";
import { setReadMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  badge: {
    width: 35,
    borderRadius: "100%",
    padding: "10px 15px",
    background: "#3F92FF",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Chat = (props) => {
  const classes = useStyles();
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
