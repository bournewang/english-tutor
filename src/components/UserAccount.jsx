import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { updateUser } from '../api/user'; // Assume you have an updateUser function in your API

const UserAccount = () => {
  const { user, setUser } = useUser();
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    gender: '',
    age: '',
    english_level: '',
  });

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(userInfo);
      setUser(updatedUser); // Update the user context with the new information
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">User Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <strong>Gender:</strong>
            <input
              type="text"
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <strong>Age:</strong>
            <input
              type="number"
              name="age"
              value={userInfo.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <strong>English Level:</strong>
            <input
              type="text"
              name="english_level"
              value={userInfo.english_level}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserAccount; 