# reference: https://stackoverflow.com/questions/59975596/how-to-connect-javascript-to-python-script-with-flask

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import time
import re
import os
import google.generativeai as genai
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# mysql connection
app.config['MYSQL_HOST'] = 'database-1.cviwo8q0ahtv.eu-north-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'Hello_Password'
app.config['MYSQL_DB'] = 'spoiler'

mysql = MySQL(app)


# global variable to check if gemini is running
geminiRunning = False


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
    # text = re.sub(r'\b\w\b', '', text)

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

# Create a new document in Firestore


def create_document(text, link, label):
    try:
        cursor = mysql.connection.cursor()
        print('Creating document...')
        query = "INSERT INTO spoilers (text, link, label) VALUES (%s, %s, %s)"
        cursor.execute(query, (text, link, label))
        mysql.connection.commit()
        print('Document created successfully!')
    except Exception as e:
        print('Error creating document:', e)
        mysql.connection.rollback()
    return False


def read_document(link):
    try:
        cursor = mysql.connection.cursor()
        print('Reading document...')
        query = "SELECT label FROM spoilers WHERE link = %s"
        cursor.execute(query, (link,))
        document = cursor.fetchone()
        if document:
            label = document['label']
            print("Label for the document with the provided link:", label)
            return label
        else:
            print('No such document!')
    except Exception as e:
        print('Error reading document:', e)


@app.route("/flagpost/", methods=["POST"])
def flagPost():
    recieved_data = request.json
    heading_data = recieved_data.get('Heading')
    text_content = recieved_data.get('TextContent')
    link = recieved_data.get('link')
    label = recieved_data.get('label')
    text_data = heading_data + text_content

    create_document(text_data, link, label)

    return "Document created successfully!"


@app.route("/aidetection/", methods=["POST"])
def aidetection():
    time.sleep(5)
    global geminiRunning
    while geminiRunning:
        isGeminiRunning = "Gemini is running"

    print("app started")

    recieved_data = request.json

    text_data = recieved_data.get('text')
    link = recieved_data.get('link')

    preprocessed_text = preprocess_data(text_data)
    print(preprocessed_text)

    # if (len(preprocessed_text) > 1000):
    #     print("Text is too long.")
    #     preprocessed_text = preprocessed_text[:1000]

    json_data = {
        "text": preprocessed_text,
        "label": 0
    }

    read_document(link)

    print("gemini starting")

    geminiRunning = True

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

    geminiRunning = False

    print("response")

    print(response.text)

    json_output = response.text.split('```')[1]

    print(json_output)

    # Replace single quotes with double quotes to make it a valid JSON string
    json_output = json_output.replace("'", '"')

    # Parse the JSON string into a dictionary
    json_output = json.loads(json_output)

    # Extract the label
    label = json_output['label']
    print(label)

    # Update the Firestore document with the predicted label
    doc_being_created = True

    while (doc_being_created):
        doc_being_created = create_document(text_data, link, label)

    # change label to string
    label = str(label)

    print("label updated")
    return label


if __name__ == "__main__":
    app.run(debug=True)
