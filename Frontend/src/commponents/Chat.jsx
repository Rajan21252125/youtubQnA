/* eslint-disable react/prop-types */
import { useState } from "react";
import { googleResult, summarize } from "../api";
import BotLoading from "./BotLoading";

const Chat = ({ token, googleSearch }) => {
    const [userMessages, setUserMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            const newUserMessage = { sender: "user", text: inputValue, time: getCurrentTime() };
            setUserMessages((prevMessages) => [...prevMessages, newUserMessage]);
            setInputValue("");
            setLoading(true);
            setTimeout(() => handleBotReply(newUserMessage), 1000);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const getBotReply = async (token, question) => {
        try {
            if (googleSearch) {
                const response = await googleResult(question);
                console.log(response)
                return response.data.output;
            } else {
                const response = await summarize(token, question);
                return response.data.message;
            }
        } catch (error) {
            return "Something went wrong. Please try again later";
        } finally {
            setLoading(false); // Stop loading after receiving bot reply
        }
    };

    const handleBotReply = async (latestUserMessage) => {
        try {
            const botReply = await getBotReply(token, latestUserMessage.text);
            setUserMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botReply, time: getCurrentTime() }]);
        } catch (error) {
            setUserMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Something went wrong. Please try again later.", time: getCurrentTime() }]);
        }
    };

    return (
        <div className="mt-10 w-full text-white">
            <div className="overflow-y-auto">
                {userMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className="bg-blue-500 text-white p-2 rounded w-4/5">
                            <div>{message.text}</div>
                            <div className="text-[10px] text-right font-semibold">{message.time}</div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <BotLoading />}
            <div className="flex items-center mb-2 mt-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 mr-2 p-2 bg-gray-700 border border-gray-600 rounded"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
