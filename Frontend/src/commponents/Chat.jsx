/* eslint-disable react/prop-types */
import { useState } from "react";
import { summarize } from "../api";

const Chat = ({ token }) => {
    const [userMessages, setUserMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            const newUserMessage = { sender: "user", text: inputValue };
            setUserMessages((prevMessages) => [...prevMessages, newUserMessage]);
            setInputValue("");
            setTimeout(() => handleBotReply(newUserMessage), 1000);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents the default behavior of submitting the form
            handleSendMessage();
        }
    };

    const getBotReply = async (token, question) => {
        try {
            setLoading(true);
            const response = await summarize(token, question);
            setLoading(false);
            return response.data;
        } catch (error) {
            return "Something went wrong Please try again later";
        }
    };

    const handleBotReply = async (latestUserMessage) => {
        try {
            const botReply = await getBotReply(token, latestUserMessage.text);
            setUserMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botReply }]);
        } catch (error) {
            setUserMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Something went wrong. Please try again later." }]);
        }
    };

    return (
        <div className="mt-10 w-full text-white">
            <div className="overflow-y-auto">
                {userMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        {message.sender === 'user' ? (
                            <div className="bg-blue-500 text-white p-2 rounded w-4/5">
                                {message?.text}
                            </div>
                        ) : (
                            <div className="bg-blue-500 text-white p-2 rounded w-4/5">
                                {message?.text?.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center mb-2 mt-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 mr-2 p-2 bg-gray-700 border border-gray-600 rounded"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // Listen for keydown event
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
