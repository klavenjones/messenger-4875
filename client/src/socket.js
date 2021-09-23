import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser
} from "./store/conversations";
import { updateMessage } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    let { message, sender, recipientId } = data;
    const { user, activeConversation } = store.getState();
    if (
      user.id === recipientId &&
      activeConversation.id === message.conversationId
    ) {
      //update a single message
      await store.dispatch(updateMessage(message, sender));
    } else {
      store.dispatch(incrementUnreadCount(message.conversationId));
      store.dispatch(setNewMessage(message, sender));
    }
  });
});

export default socket;
