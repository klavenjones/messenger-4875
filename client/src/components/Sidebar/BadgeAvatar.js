import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { useAvatarStyles } from "../../styles/Sidebar";



const UserAvatar = (props) => {
  const classes = useAvatarStyles();
  const { sidebar, username, photoUrl, online } = props;

  return (
    <Box className={sidebar ? classes.sidebar : ""}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circular"
      >
        <Avatar
          alt={username}
          src={photoUrl}
          className={classes.profilePic}
        ></Avatar>
      </Badge>
    </Box>
  );
};

export default UserAvatar;
