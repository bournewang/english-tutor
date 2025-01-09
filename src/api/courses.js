import request from './request';

// get all courses
export const getCourses = async (level) => {
  const courses = await request(`/api/courses?level=${level}`, {
    method: 'GET'
  });
  return courses;
};

// get course by id
export const getCourseById = async (courseId) => {
  try {
    const course = await request(`/api/courses/${courseId}`, {
      method: 'GET',
    });
    return course;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

// Update course selection
export const updateCourseSelection = async (courseId) => {
  try {
    const updatedCourse = await request(`/api/courses/${courseId}/select`, {
      method: 'POST',
    });
    return updatedCourse;
  } catch (error) {
    console.error('Error updating course selection:', error);
    throw error;
  }
}; 