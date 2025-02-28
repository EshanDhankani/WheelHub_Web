

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/Chat';
import ChatList from '../components/ChatList';

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const currentUserId = 'yourCurrentUserId'; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="chat-page">
      <ChatList users={users} onSelectUser={setSelectedUserId} />
      {selectedUserId && (
        <Chat currentUserId={currentUserId} receiverId={selectedUserId} />
      )}
    </div>
  );
};

export default ChatPage;
