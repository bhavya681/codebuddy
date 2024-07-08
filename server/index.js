/*

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import route from "./routes/route.js";

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

dotenv.config();

//Container->Server->Various sockets are connected to server and when then are connected then the emit that is Welcome to Chat Server will be displayed to sockets present in chat Server

connectDb();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("<center><h1>Hello There!</h1></center>");
});

app.use("/api", route);

const users = {};

/
{
"bhavyawade":"socket._id"
}
 /


io.on("connection", (socket) => {
  console.log(socket.id, "Connected");
  //Send A Welcome Message To Connected Client in server
  socket.emit("welcome", `Welcome to the Chat Server ${socket.id}`);
  //handle Intiate-Chat Event
  socket.on("initiate-chat", ({ senderEmail, recipientEmail }) => {
    //store the sender's socket id
    users[senderEmail] = socket.id;
    console.log(Object.keys(users).length);
    //notify the recipient about new user
    if (users[recipientEmail]) {
      //notify both sender and reciepents that chat is initiated .
      //io is server which contains various sockets is an indivaual connct in server that is io
      io.to(users[recipientEmail]).emit("chat-initiated", senderEmail);
      io.to(users[senderEmail]).emit("chat-initiated", recipientEmail);
    } else {
      //handle Offline User
      console.log(`User ${recipientEmail} is offline`);
      //notify
      io.to(users[senderEmail]).emit("offline", recipientEmail);
    }
  });
  //handle Sending Messages
  socket.on("send-message", ({ senderEmail, recipientEmail, message }) => {
    //send message to recipient/reciever
    console.log({ senderEmail, recipientEmail, message });
    if (users[recipientEmail]) {
      //send the message only to the recipient
      io.to(users[recipientEmail]).emit("receive-message", {
        senderEmail,
        message,
      });
    } else {
      console.log(`User ${recipientEmail} is offline`);
      io.to(users[senderEmail]).emit("recipient-offline", recipientEmail);
    }
  });
  socket.on("disconnect", () => {
    console.log(socket.id, "Disconnected");
    //remove the socket id from user object
    const email = Object.keys(users).find((key) => users[key] === socket.id);
    if (email) {
      //delete build in function of Object
      delete users[email];
    }
  });
});


// Use `server.listen` to attach the Socket.IO server to the HTTP server
server.listen(port, () => {
  console.log(`Server is working on port:${port}`);
});


*/

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import route from "./routes/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect to the database
connectDb();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<center><h1>Hello There!</h1></center>");
});
app.use("/api", route);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log(socket.id, "Connected");
  socket.emit("welcome", `Welcome to the Chat Server ${socket.id}`);

  socket.on("initiate-chat", ({ senderEmail, recipientEmail }) => {
    users[senderEmail] = socket.id;
    console.log(Object.keys(users).length);
    if (users[recipientEmail]) {
      io.to(users[recipientEmail]).emit("chat-initiated", senderEmail);
      io.to(users[senderEmail]).emit("chat-initiated", recipientEmail);
    } else {
      console.log(`User ${recipientEmail} is offline`);
      io.to(users[senderEmail]).emit("recipient-offline", recipientEmail);
    }
  });

  socket.on("send-message", ({ senderEmail, recipientEmail, message }) => {
    console.log({ senderEmail, recipientEmail, message });
    if (users[recipientEmail]) {
      io.to(users[recipientEmail]).emit("receive-message", {
        senderEmail,
        message,
      });
    } else {
      console.log(`User ${recipientEmail} is offline`);
      io.to(users[senderEmail]).emit("recipient-offline", recipientEmail);
    }
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "Disconnected");
    const email = Object.keys(users).find((key) => users[key] === socket.id);
    if (email) {
      delete users[email];
    }
  });
});

server.listen(port, () => {
  console.log(`Server is working on port: ${port}`);
});
