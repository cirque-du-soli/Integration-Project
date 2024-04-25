import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
//const socket = io(`${baseUrl}:3001`);
const socket = io(baseUrl, { secure: true });

function Chat({ boardId, isOpen }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    socket.emit("joinBoard", boardId);

    socket.on("chatMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [boardId]);

  const messagesContainerRef = useRef(null);
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const sendMessage = () => {
    if (message) {
      socket.emit("chatMessage", {
        boardId,
        accessToken,
        messageText: message,
      });
      setMessage("");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/mosaics/${boardId}/messages`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-8 mr-8">
      <div className="w-72 h-96 border border-gray-300 rounded-lg p-4 bg-white bg-opacity-85">
        <div
          ref={messagesContainerRef}
          className="h-72 overflow-auto mb-4 px-2 py-1"
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-1">
              <strong>{msg.username}</strong>: {msg.messageText}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mr-2 border border-gray-300 rounded px-2 py-1 mb-1"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}

export default Chat;
