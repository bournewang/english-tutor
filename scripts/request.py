import requests

# define base url
BASE_URL = 'http://localhost:8787'

def request(path, method='GET', data=None):
    url = f'{BASE_URL}/{path}'
    response = requests.request(method, url, json=data)
    return response.json()

def create_course(title, description = None, level_id = None, category_id = None):
    return request('/api/courses', 'POST', {
        'name': title,
        'description': description,
        'level_id': level_id,
        'category_id': category_id
    })

def create_lesson(course_id, title, description = None, sort = 0):
    return request(f'/api/lessons', 'POST', {
        'name': title,
        'description': description,
        'course_id': course_id,
        'sort': sort
    })

# def create_slide(lesson_id, title, content):
#     return request(f'/api/slides', 'POST', {
#         'title': title,
#         'content': content,
#         'lesson_id': lesson_id
#     })

def create_slides(lesson_id, slides):
    return request(f'/api/slides/lesson/{lesson_id}', 'POST', slides)

def get_lesson_by_course_id_and_name(course_id, lesson_name):
    response = request(f'/api/lessons/course/{course_id}/name/{lesson_name}', 'GET')
    if response is None or response.get('error'):
        return None
    return response

def get_course_by_name(course_name):
    #  return None if course not found
    response = request(f'/api/courses/name/{course_name}', 'GET')
    if response is None or response.get('error'):
        return None
    return response
