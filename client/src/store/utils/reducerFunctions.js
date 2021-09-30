export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadMessages: 0
    };

    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  let newStateCopy = [...state];
  return newStateCopy.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      const { messages, otherUser, user1, user2 } = convoCopy;

      messages.push(message);
      convoCopy.latestMessageText = message.text;
      if (messages[messages.length - 1].senderId === otherUser.id) {
        if (!user1 || !user2) {
          convoCopy.unreadMessages++;
        }
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  let newState = [...state];
  return newState.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      let convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addReadStatusToStore = (state, payload) => {
  const { conversationId } = payload;
  const newState = [...state];
  return newState.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.forEach((message) => {
        if (message.senderId !== convoCopy.otherUser.id) {
          message.read = true;
        }
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addUnreadToStore = (state, payload) => {
  const { conversationId } = payload;
  const newState = [...state];
  return newState.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.unreadMessages = 0;
      return convoCopy;
    }
    return convo;
  });
};
