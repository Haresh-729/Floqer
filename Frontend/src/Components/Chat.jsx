import React, { useState } from 'react';
import { GetChatResponse } from '../Services/Repository/SalaryDataRepo';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatRes, setChatRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const onButtonClick = async () => {
    setLoading(true);
    setChatRes(null);
    const response = await GetChatResponse(message);
    console.log(response);
    setChatRes(response);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-xl font-semibold text-center text-gray-700">Chat with Us</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            placeholder="Type your message..."
          />
          <button
            className={`px-4 py-2 font-semibold text-white rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={onButtonClick}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <p className="text-center text-gray-700">{chatRes}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
