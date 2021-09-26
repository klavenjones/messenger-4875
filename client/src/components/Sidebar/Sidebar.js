import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSideBarStyles } from "../../styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";


const Sidebar = (props) => {
  const classes = useSideBarStyles();
  const conversations = props.conversations || [];
  const { handleChange, searchTerm } = props;

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) =>
          conversation.otherUser.username.includes(searchTerm)
        )
        .map((conversation) => {
          return (
            <Chat
              conversation={conversation}
              key={conversation.otherUser.username}
            />
          );
        })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps)(Sidebar);
