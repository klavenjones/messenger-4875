const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const { user1Id, user2Id } = await Conversation.findByPk(conversationId);
      if (
        (user1Id !== senderId && user2Id !== senderId) ||
        (user1Id !== recipientId && user2Id !== recipientId)
      ) {
        return res.sendStatus(403);
      }
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

//Apply read message
router.put("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { senderId, conversationId } = req.body;

    if (!conversationId || !senderId) {
      console.log(conversationId, senderId);
      return res.sendStatus(400);
    }
    const { user1Id, user2Id } = await Conversation.findByPk(conversationId);

    if (user1Id !== req.user.id && user2Id !== req.user.id) {
      return res.sendStatus(403);
    }
    await Message.markAsRead(req.user.id, conversationId);

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
