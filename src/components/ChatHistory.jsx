import React from 'react';

const ChatHistory = ({ chatMessages }) => {
  return (
    <div className=" rounded  mb-4">
      <h2 className="p-2 bg-gray-200 text-xl font-semibold mb-2">Chat History</h2>
      <ul className="p-2 space-y-2">
        {chatMessages.map((msg) => (
          <li key={msg.id} className="p-2 border-b">
            {/* show a emoji for the sender */}
            <strong>{msg.sender === 'Student' ? '👤' : '🤖'}</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory; 