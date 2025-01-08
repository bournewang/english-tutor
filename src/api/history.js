import request  from './request';

// get course history
export const getCourseHistory = async () => {
  const courseHistory = await request('/api/course-history', {
    method: 'GET',
  });
  return courseHistory;
};

// get lesson history
export const getLessonHistory = async () => {
  const lessonHistory = await request('/api/lesson-history', {
    method: 'GET',
  });
  return lessonHistory;
};

// create course history
export const createCourseHistory = async (params) => {
  const courseHistory = await request('/api/course-history', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return courseHistory;
};

// create lesson history
export const createLessonHistory = async (params) => {
  const lessonHistory = await request('/api/lesson-history', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return lessonHistory;
};