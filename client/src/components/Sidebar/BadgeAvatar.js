import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profilePic: {
    height: theme.spacing(2.75),
    width: theme.spacing(2.75)
  },
  badge: {
    height: theme.spacing(0.8125),
    width: theme.spacing(0.8125),
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "#D0DAE9"
  },
  online: {
    backgroundColor: "#1CED84"
  },
  sidebar: {
    marginLeft: theme.spacing(1.0625)
  }
}));

const UserAvatar = (props) => {
  const classes = useStyles();
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
