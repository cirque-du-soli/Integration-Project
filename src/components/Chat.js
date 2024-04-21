import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
//const socket = io(`${baseUrl}:3001`);
const socket = io(baseUrl);

function Chat({ boardId, isOpen }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        socket.emit('joinBoard', boardId);

        socket.on('chatMessage', message => {
            setMessages(messages => [...messages, message]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, [boardId]);

    useEffect(() => {
        if (isOpen) {
            fetchMessages();
        }
    }, [isOpen]);

    const sendMessage = () => {
        if (message) {
            socket.emit('chatMessage', { boardId, accessToken, messageText: message });
            setMessage('');
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/mosaics/${boardId}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    return (
        <div style={{ position: 'relative', width: '300px', height: '400px', border: '1px solid black', padding: '10px', margin: '10px', boxSizing: 'border-box' }}>
            <div style={{ height: '340px', overflowY: 'auto', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>
                        <strong>{msg.username}</strong>: {msg.messageText}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: 'calc(100% - 90px)', marginRight: '10px' }}
            />
            <button onClick={sendMessage} style={{ width: '80px' }}>Send</button>
        </div>
    );
}

export default Chat;
