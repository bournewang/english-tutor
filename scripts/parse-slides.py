import sys
import markdown
import json
from bs4 import BeautifulSoup
from request import create_course, create_lesson, create_slides, get_course_by_name, get_lesson_by_course_id_and_name   

def create_course_material_from_json(file_path):
    """
    Parses a Markdown file, converts it to HTML, and extracts all <h3> elements
    along with their sibling content.

    :param file_path: Path to the Markdown file.
    :return: A dictionary with <h3> text as keys and their sibling content as values.
    """
    try:
        course = None
        with open(file_path, 'r', encoding='utf-8') as file:
            json_content = file.read()
            # print("json_content: ", json_content)
            json_data = json.loads(json_content)
            markdown_contents = json_data['output']
            # print("markdown_contents: ", markdown_contents)
            for markdown_content in markdown_contents:
                # Convert Markdown to HTML
                # Convert Markdown to HTML
                html_content = markdown.markdown(markdown_content)
                # print("html_content: ", html_content)
                # exit(0)
                
                # Parse HTML with BeautifulSoup
                soup = BeautifulSoup(html_content, 'html.parser')
                
                h2_tags = soup.find_all('h2')
                course_title = h2_tags[0].get_text() if h2_tags[0] else 'No Course Title'
                lesson_title = h2_tags[1].get_text() if h2_tags[1] else 'No Lesson Title'
                level = h2_tags[2].get_text() if h2_tags[2] else 'No Level'
                # print("course_title: ", course_title)
                # print("lesson_title: ", lesson_title)
                # print("level: ", level)
                # exit(0)
                
                # Extract <h3> elements and their sibling content
                slides = []
                for h3 in soup.find_all('h3'):
                    content = []
                    for sibling in h3.find_next_siblings():
                        if sibling.name == 'h3':
                            break
                        content.append(str(sibling))
                    slides.append({
                        'title': h3.get_text(),
                        'content': ''.join(content)
                    })
                
                if not course:
                    course_name = course_title + ' - ' + level
                    course = create_course(course_name, level=level)
                    print("create course: ", course)
                if course:
                    lesson = create_lesson(course.get('id'), lesson_title)
                    print("create lesson: ", lesson)
                    if lesson:
                        create_slides(lesson.get('id'), slides)
                        print("create slides: ", [slide.get('title') for slide in slides])


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
    create_course_material_from_json(file_path)
    
