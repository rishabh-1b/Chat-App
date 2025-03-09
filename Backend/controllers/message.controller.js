const conversationModel = require("../models/conversation.model");
const messageModel = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation)
      conversation = await conversationModel.create({
        participants: [senderId, receiverId]
      })

    const newMessage = await messageModel.create(
      {
        sender: senderId,
        receiver: receiverId,
        message
      }
    )

    conversation.messages.push(newMessage);

    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(
      {
        success: true,
        message: "Message sent successfully",
        newMessage
      }
    )
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error occurred while sending the message",
        error: error.message
      }
    )
  }
}

exports.getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("messages");

    let messages = [];

    if (conversation)
      messages = conversation.messages;

    res.status(200).json(
      {
        success: true,
        message: "Messages retrieved successfully",
        messages
      }
    )
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error occurred while getting the messages",
        error: error.message
      }
    )
  }
}