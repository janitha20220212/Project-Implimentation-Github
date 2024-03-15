# reference: https://stackoverflow.com/questions/59975596/how-to-connect-javascript-to-python-script-with-flask

from flask import Flask, jsonify, request

app = Flask(__name__)

# Display your index page


@app.route("/")
def index():
    return "Hello, World!"


def preprocess_data(text):
    import os
    # imports re module which provides support for regular expressions to be used in the python program
    import re

    # reference to regular expression codes: https://regex101.com/

    # remove any special characters and punctuation from the text
    text = re.sub(r'[^\w\s]', '', text)

    # remove any singular characters from the text like 'a' or 'I'
    text = re.sub(r'\b\w\b', '', text)

    # remove all HTML tags from the text
    text = re.sub(r'<.*?>', '', text)

    # change all the text to lowercase
    text = text.lower()

    # remove any extra spaces from the text
    # reference: https://stackoverflow.com/questions/1185524/how-do-i-trim-whitespace
    text = re.sub(r'\s+', ' ', text)

    # remove any leading or trailing spaces from the text
    # reference: https://www.geeksforgeeks.org/python-string-strip/
    text = text.strip()

    # returns the cleaned text
    return text


@app.route("/aidetection", methods=["POST"])
def aidetection():
    import re
    import os
    import google.generativeai as genai
    # text_data = request.json.get('text', '')
    text_data = "Sam is directed spider man 3"

    preprocessed_text = preprocess_data(text_data)

    json_data = {
        "text": preprocessed_text,
        "label": 0
    }
    genai.configure(api_key="AIzaSyAVXflbZLBt9XILv5om1PGgCYc5NHxDcbs")

    model = genai.GenerativeModel('gemini-pro')

    return jsonify(json_data)


if __name__ == "__main__":
    app.run()
