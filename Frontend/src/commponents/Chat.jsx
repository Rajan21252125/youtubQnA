import { useState } from "react";

const Chat = () => {
    const [userMessages, setUserMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            setUserMessages(prevMessages => [...prevMessages, { sender: "user", text: inputValue }]);
            setInputValue("");
            setTimeout(handleBotReply, 1000);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents the default behavior of submitting the form
            handleSendMessage();
        }
    };

    // Dummy bot replies for demonstration
    const getBotReply = () => {
        return "This is a bot reply.";
    };

    const handleBotReply = () => {
        const botReply = getBotReply();
        setUserMessages(prevMessages => [...prevMessages, { sender: "bot", text: botReply }]);
    };

    return (
        <div className="mt-10 w-full text-white">
            <div className="overflow-y-auto">
                {userMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className="bg-blue-500 text-white p-2 rounded">
                            {message.text}
                        </div>
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
                    onClick={() => {
                        handleSendMessage();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
