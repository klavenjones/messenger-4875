const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");
const { Op } = require("sequelize");
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
    console.log(req.body);

    if (!conversationId || !senderId) {
      return res.sendStatus(400);
    }
    const { user1Id, user2Id } = await Conversation.findByPk(conversationId);
    console.log(user1Id);
    if (user1Id !== req.user.id && user2Id !== req.user.id) {
      return res.sendStatus(403);
    }
    await Message.markAsRead(req.user.id, conversationId);

    let updatedConvo = await Conversation.findOne({
      where: {
        id: conversationId
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: req.user.id
            }
          },
          attributes: ["id", "username", "photoUrl"],
          required: false
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: req.user.id
            }
          },
          attributes: ["id", "username", "photoUrl"],
          required: false
        }
      ]
    });
    const convoJSON = updatedConvo.toJSON();

    if (convoJSON.user1) {
      convoJSON.otherUser = convoJSON.user1;
      delete convoJSON.user1;
    } else if (convoJSON.user2) {
      convoJSON.otherUser = convoJSON.user2;
      delete convoJSON.user2;
    }
    const endOfConvoListIndex = convoJSON.messages.length - 1;
    convoJSON.latestMessageText = convoJSON.messages[endOfConvoListIndex].text;
    return res.status(200).json({ conversation: convoJSON });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
