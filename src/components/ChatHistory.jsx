import React from 'react';

const ChatHistory = ({ chatMessages }) => {
  return (
    <div className="p-4 rounded  mb-4">
      <h2 className="text-xl font-semibold mb-2">Chat History</h2>
      <ul className="space-y-2">
        {chatMessages.map((msg) => (
          <li key={msg.id} className="p-2 border-b">
            <strong>{msg.sender}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory; 