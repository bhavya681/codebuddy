import User from "../db/models/User.js";
import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhavyawade2@gmail.com", // Replace with your email
        pass: "Hard2HackMe4Money", // Replace with your password
      },
    });

    let info = await transporter.sendMail({
      from: `${name} <${email}>`,
      to: "recipient-email@example.com", // Replace with recipient email
      subject: "Message from Contact Form",
      text: message,
    });

    console.log("Message sent: %s", info.messageId);
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const addToFav = async (req, res) => {
  const myId = req.id;
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      { _id: myId },
      {
        $push: { favourities: id },
      }
    );
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Added To Favourites" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const addToDis = async (req, res) => {
  const myId = req.id;
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      { _id: myId },
      {
        $push: { disliked: id },
      }
    );
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Added To Disliked" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const getFromFav = async (req, res) => {
  const myId = req.id;
  try {
    let users = await User.findById({ _id: myId }).populate({
      path: "favourities",
      select: "name email profile _id",
    });
    if (!users) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    return res.status(200).send({ success: false, data: users.favourities });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const getFromDis = async (req, res) => {
  const myId = req.id;
  try {
    const users = await User.findById({ _id: myId }).populate({
      path: "disliked",
      select: "name email profile id",
    });
    if (!users) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }
    return res.status(200).send({ success: false, data: users.disliked });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};
