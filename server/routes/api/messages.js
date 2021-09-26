const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, read } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
        read
      });
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

router.put("/update", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const { conversation } = req.body;
    await Message.update(
      {
        read: true
      },
      {
        where: {
          conversationId: conversation.id,
          read: false,
          senderId: {
            [Op.not]: req.user.id
          }
        },
        fields: ["read"],
        returning: true
      }
    );

    res.json("success");
  } catch (error) {
    next(error);
  }
});

router.put("/update/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;
    await Message.update({ read: true }, { where: { id: messageId } });
    res.json("Success");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
