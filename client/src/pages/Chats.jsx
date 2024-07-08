/*

import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { io } from "socket.io-client";

const Chats = () => {

  const socket = useMemo(() => io("http://localhost:5000"), []);

  const { user } = useContext(AppContext);

  const [friends, setFirends] = useState([]);
  const [recipientEmail, setRecipients] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const getFromFav = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/getFromFav`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = await res.data;
      setFirends(data);
      console.log(data);
    } catch (error) {
      console.log("Error Fetching Friends", error);
    }
  };

  useEffect(() => {
    getFromFav();
  }, []);

  useEffect(() => {
    // const welcome = (data) => alert(data);
    // socket.on("welcome", welcome);

    const onConnect = () => console.log("Connected to :",socket.id);

    const onDisconnect = () => {
      console.log("Disconnected", socket.id);
    };

    const onRecieve = (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, senderEmail: message.senderEmail || user.email },
      ]);
    };

    const onOffline = (recipientEmail) => {
      toast.error(`${recipientEmail} is offline`);
    };

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);
    socket.on("receive-message", onRecieve);
    socket.on("recipient-offline", onOffline);

    //cleanup function
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-message", onRecieve);
      socket.off("recipient-offline", onOffline);
    };
  }, [socket, user.email]);

  const handleSendMessage = () => {
    socket.emit("send-message", {
      senderEmail: user.email,
      recipientEmail: recipientEmail,
      message: inputMessage,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: inputMessage, senderEmail: user.email },
    ]);
    setInputMessage("");
  };

  const initiateChat = (email) => {
    setRecipients(email);
    toast.success(`Chat initiated with ${email}`);
    socket.emit("initiate-chat", {
      senderEmail: user.email,
      recipientEmail: email,
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-evenly items-center">
        <div className="w-screen overflow-x-hidden sm:overflow-hidden sm:w-[20vw] my-6 p-3">
          <h1 className="text-3xl font-bold mb-5 text-white">Chats</h1>
          <div className="flex sm:flex-wrap gap-4 overflow-x-scroll sm:overflow-x-hidden">
            {friends?.map((friend) => (
              <>
                <div
                  key={friend?._id}
                  onClick={() => {
                    initiateChat(friend?.email);
                  }}
                  className={`bg-white p-4 rounded-lg
                ${
                  recipientEmail === friend?.email &&
                  "shadow-primary shadow-inner"
                }
                `}
                >
                  <img
                    src={friend?.profile}
                    alt={friend?.name}
                    className="w-20 h-20 rounded-full mx-auto shadow-lg shadow-primaryLight cursor-pointer  hover:transition-all hover:animate-bounce hover:ease-in-out"
                  />
                  <p className="font-bold text-center  mt-2 font-ropaSans capitalize">
                    {friend?.name}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
        {/ Chats/}
        <div className="w-[90vw] sm:w-[60vw] h-[80vh] shadow-primary shadow-inner my-6 rounded-lg relative">
          <h1 className="text-xl font-bold p-4 text-white bg-primary rounded-tl-md rounded-tr-md font-ropaSans">
            {recipientEmail}
          </h1>
          <div className="h-[80%] overflow-y-scroll p-4">
            {messages.map((message, index) => (
              <>
                <div
                  key={index}
                  className={`flex ${
                    message.senderEmail === user.email
                      ? "justify-end"
                      : "justify-start"
                  }mb-4 p-2`}
                >
                  <div
                    className={`p-2 bg-${
                      message.senderEmail === user.email ? "primary" : "white"
                    } text-${
                      message.senderEmail === user.email ? "white" : "black"
                    }p-2 w-fit rounded-lg ${
                      message.senderEmail === user.email
                        ? "rounded-tr-none ml-auto"
                        : "rounded-tl-none"
                    }`}
                  >
                    <span>{message.senderEmail}</span>
                    <p>{message.message}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="absolute b-2 left-0 right-0 flex items-center justify-center gap-2">
            <input
              type="text"
              name="message"
              placeholder="Type a message"
              className="w-[90%] py-2 rounded-md px-4 outline-none"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
            />
            <button
              className="bg-primary text-white py-2 px-5 rounded-md font-ropaSans"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;

*/


import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { io } from "socket.io-client";

const Chats = () => {
  const socket = useMemo(() => io(`${import.meta.env.VITE_BACKEND_URL}`), []);
  const { user } = useContext(AppContext);
  const [friends, setFriends] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const getFromFav = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getFromFav`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = res.data;
      setFriends(data);
    } catch (error) {
      console.log("Error Fetching Friends", error);
    }
  };

  useEffect(() => {
    getFromFav();
  }, []);

  useEffect(() => {
    const onConnect = () => console.log("Connected to:", socket.id);
    const onDisconnect = () => {
      console.log("Disconnected", socket.id);
    };
    const onReceiveMessage = (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, senderEmail: message.senderEmail || user.email },
      ]);
    };
    const onRecipientOffline = (recipientEmail) => {
      toast.error(`${recipientEmail} is offline`);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive-message", onReceiveMessage);
    socket.on("recipient-offline", onRecipientOffline);

    // Cleanup function
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-message", onReceiveMessage);
      socket.off("recipient-offline", onRecipientOffline);
    };
  }, [socket, user.email]);

  const handleSendMessage = () => {
    socket.emit("send-message", {
      senderEmail: user.email,
      recipientEmail: recipientEmail,
      message: inputMessage,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: inputMessage, senderEmail: user.email },
    ]);
    setInputMessage("");
  };

  const initiateChat = (email) => {
    setRecipientEmail(email);
    toast.success(`Chat initiated with ${email}`);
    socket.emit("initiate-chat", {
      senderEmail: user.email,
      recipientEmail: email,
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-evenly items-center">
        <div className="w-screen overflow-x-hidden sm:overflow-hidden sm:w-[20vw] my-6 p-3">
          <h1 className="text-3xl font-bold mb-5 text-white">Chats</h1>
          <div className="flex sm:flex-wrap gap-4 overflow-x-scroll sm:overflow-x-hidden">
            {friends?.map((friend) => (
<>
              <div
                key={friend?._id}
                onClick={() => initiateChat(friend?.email)}
                className={`bg-white p-4 rounded-lg ${
                  recipientEmail === friend?.email && "shadow-primary shadow-inner"
                }`}
              >
                <img
                  src={friend?.profile}
                  alt={friend?.name}
                  className="w-20 h-20 rounded-full mx-auto shadow-lg shadow-primaryLight cursor-pointer hover:transition-all hover:animate-bounce hover:ease-in-out"
                />
                <p className="font-bold text-center mt-2 font-ropaSans capitalize">
                  {friend?.name}
                </p>
              </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-[90vw] sm:w-[60vw] h-[80vh] shadow-primary shadow-inner my-6 rounded-lg relative">
          <h1 className="text-xl font-bold p-4 text-white bg-primary rounded-tl-md rounded-tr-md font-ropaSans">
            {recipientEmail}
          </h1>
          <div className="h-[80%] overflow-y-scroll p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderEmail === user.email ? "justify-end" : "justify-start"
                } mb-4 p-2`}
              >
                <div
                  className={`p-2 bg-${
                    message.senderEmail === user.email ? "primary" : "white"
                  } text-${message.senderEmail === user.email ? "white" : "black"} p-2 w-fit rounded-lg ${
                    message.senderEmail === user.email ? "rounded-tr-none ml-auto" : "rounded-tl-none"
                  }`}
                >
                  {/* <span>{message.senderEmail}</span> */}
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute b-2 left-0 right-0 flex items-center justify-center gap-2">
            <input
              type="text"
              name="message"
              placeholder="Type a message"
              className="w-[90%] py-2 rounded-md px-4 outline-none"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              className="bg-primary text-white py-2 px-5 rounded-md font-ropaSans"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
