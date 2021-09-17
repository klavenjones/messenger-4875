const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

Message.markAsRead = async function (senderId, conversationId) {
  return await Message.update(
    { read: true },
    {
      where: {
        conversationId: conversationId,
        senderId: senderId,
        read: false
      }
    }
  );
};

module.exports = Message;
