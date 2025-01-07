import request from './request';
// get lessons by course id
export const getLessonsByCourseId = async (courseId) => {
  const lessons = await request(`/api/courses/${courseId}/lessons`, {
    method: 'GET',
  });
  return lessons;
};

// get lesson by id
export const getLessonById = async (lessonId) => {
  const lesson = await request(`/api/lessons/${lessonId}`, {
    method: 'GET',
  });
  return lesson;
};