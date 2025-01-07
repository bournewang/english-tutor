import request from './request';

export const updateUser = async (userInfo) => {
  try {
    const updatedUser = await request('/api/user', {
      method: 'PUT',
      body: JSON.stringify(userInfo),
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const userInfo = await request('/api/user', {
      method: 'GET',
    });
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const updateCurrentCourse = async (courseId) => {
  try {
    const updatedCourse = await request('/api/current-course', {
      method: 'PUT',
      body: JSON.stringify({ courseId }),
    });
    return updatedCourse;
  } catch (error) {
    console.error('Error updating current course:', error);
    throw error;
  }
};