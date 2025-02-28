import React from 'react';

const ChatList = ({ users }) => {
  const userList = Array.isArray(users) ? users : [];

  return (
    <div>
      {userList.length === 0 ? (
        <p>No users available</p>
      ) : (
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
