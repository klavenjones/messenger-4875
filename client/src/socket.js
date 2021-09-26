import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementUnreadCount
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

  socket.on("new-message", async (data) => {
    let { message, sender, recipientId } = data;
    const user = store.getState().user;
    const activeConvo = store.getState().activeConversation;

    if (user.id === recipientId && activeConvo.id === message.conversationId) {
      //update a single message
      store.dispatch(updateMessage(message, sender));
    } else {
      store.dispatch(incrementUnreadCount(message.conversationId));
      store.dispatch(setNewMessage(message, sender));
    }
  });
});

export default socket;
