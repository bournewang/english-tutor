import sys
import markdown
from bs4 import BeautifulSoup
from request import create_course, create_lesson, create_slides, get_course_by_name, get_lesson_by_course_id_and_name   

def parse_markdown_file(file_path):
    """
    Parses a Markdown file, converts it to HTML, and extracts all <h3> elements
    along with their sibling content.

    :param file_path: Path to the Markdown file.
    :return: A dictionary with <h3> text as keys and their sibling content as values.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            markdown_content = file.read()
        
        # Convert Markdown to HTML
        html_content = markdown.markdown(markdown_content)
        
        # Parse HTML with BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # get h1 title
        course_title = soup.find('h1').get_text() if soup.find('h1') else 'No Course Title'
        # get h2 title
        lesson_title = soup.find('h2').get_text() if soup.find('h2') else 'No Lesson Title'
        
        # Extract <h3> elements and their sibling content
        result = []
        for h3 in soup.find_all('h3'):
            content = []
            for sibling in h3.find_next_siblings():
                if sibling.name == 'h3':
                    break
                content.append(str(sibling))
            result.append({
                'title': h3.get_text(),
                'content': ''.join(content)
            })
        
        # print(result)
        return {
            'course_title': course_title,
            'lesson_title': lesson_title,
            'slides': result
        }

    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
if __name__ == "__main__":
    # check if file path is provided
    if len(sys.argv) < 2:
        print("Please provide a file path")
        print("Usage: python generate-slides.py <file_path>")
        sys.exit(1)
    # get file path from command line
    file_path = sys.argv[1]
    parsed_content = parse_markdown_file(file_path)
    # print(parsed_content)
    print("course title: ", parsed_content['course_title'])
    # get course by name
    course = get_course_by_name(parsed_content['course_title'])

    if course.get('error'):
        print(course.get('error'))
        # create course
        course = create_course(parsed_content['course_title'])
        if course.get('error'):
            print(course.get('error'))
    else:
        print(course)
    
    # get lesson by course id and lesson name
    lesson = get_lesson_by_course_id_and_name(course.get('id'), parsed_content['lesson_title'])
    if not lesson:
        print("lesson not found, creating lesson")
        # create lesson
        lesson = create_lesson(course.get('id'), parsed_content['lesson_title'])
        if lesson.get('error'):
            print(lesson.get('error'))
        else:
            print(lesson)
    else:
        print(lesson)

    if lesson:
        # create slides
        print("creating slides for lesson: ", lesson.get('id'))
        slides = create_slides(lesson.get('id'), parsed_content['slides'])
        print(slides)
