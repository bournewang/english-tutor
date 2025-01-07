import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext'; // Ensure this is correctly imported
import { updateUser } from '../api/user'; // Ensure this is correctly imported
import DashboardLayout from './DashboardLayout';

const ProfilePage = () => {
  const userContext = useUser(); // Call useUser at the top level
  const { user, setUser } = userContext;
//   const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    english_level: '',
  });
  console.log(user)
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
        console.log(user);
      setFormData({
        email: user.email,
        name: user.name,
        gender: user.gender,
        age: user.age,
        english_level: user.english_level,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setUser(formData);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

//   define the gender options, M for male, F for female
// should show label Male/Female while the value is M/F
const genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
];

const englishLevelOptions = [
    { label: 'A1 - Beginner', value: 'A1' },
    { label: 'A2 - Elementary', value: 'A2' },
    { label: 'B1 - Intermediate', value: 'B1' },
    { label: 'B2 - Upper-Intermediate', value: 'B2' },
    { label: 'C1 - Advanced English', value: 'C1' },
    { label: 'C2 - Proficiency English', value: 'C2' },
];

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {!editing ? (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender === 'M' ? 'Male' : 'Female'}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>English Level:</strong> {user.english_level}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Gender</option>
                {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
                <option value="O">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">English Level</label>
              <select
                name="english_level"
                value={formData.english_level}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Level</option>
                {englishLevelOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage; 