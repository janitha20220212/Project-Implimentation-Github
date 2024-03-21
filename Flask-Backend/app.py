# reference: https://stackoverflow.com/questions/59975596/how-to-connect-javascript-to-python-script-with-flask

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# CORS(app, resources={r"/aidetection/*": {"origins": "*"}})

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


@app.route("/aidetection/", methods=["POST"])
def aidetection():
    print("app started")
    import re
    import os
    import google.generativeai as genai
    text_data = request.json.get('text', '')

    preprocessed_text = preprocess_data(text_data)

    print(preprocessed_text)

    json_data = {
        "text": preprocessed_text,
        "label": 0
    }
    genai.configure(api_key="AIzaSyDgm7yEAv7RCI-LC3uHqLvz30kyZzerBBM")

    model = genai.GenerativeModel('gemini-pro')

    prompt = (f"""
    You are an expert in language patern detection, who is good at classifying a text in to actual spoiler or not.
    Help me classify spoilers into: Spoiler(label=1), and Not a Spoiler(label=0).
    Spoilers are provided between three back ticks.
    In your output, only return the Json code back as output - which is provided between three backticks.
    Your task is to update predicted labels under 'label' in the Json code.
    Don't make any changes to Json code format, please.

    ```
    {json_data}
    ```
    """)

    # print(convo.last.text)
    response = model.generate_content(prompt)

    print("response")

    print(response.text.split('"label": ')[1][0])

    # Extract the JSON code from the conversation's last text
    json_output = print(response.text.split('"label": ')[1][0])

    return jsonify(json_output)


if __name__ == "__main__":
    app.run(debug=True)
