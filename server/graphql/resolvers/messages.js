const { User, Message } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getMessages: async (parant, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");

        const otherUser = await User.findOne({ where: { email: from } });
        if (!otherUser)
          throw new UserInputError(
            "We clould not find user you trying to reach."
          );

        const senderReciever = [user.email, otherUser.email];

        const allMessages = await Message.findAll({
          where: {
            from: { [Op.in]: senderReciever },
            to: { [Op.in]: senderReciever },
          },
          order: [["createdAt", "DESC"]],
        });

        return allMessages;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    sendMessage: async (parant, { to, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated User!");

        const recipient = await User.findOne({ where: { email: to } });

        if (!recipient) throw new UserInputError("Recipient not found");

        if (recipient.email === user.email)
          throw new UserInputError("You cant message you!");

        if (content.trim() === "")
          throw new UserInputError("Message should not be empty!");

        const newMessage = await Message.create({
          from: user.email,
          to,
          content,
        });

        return newMessage;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
