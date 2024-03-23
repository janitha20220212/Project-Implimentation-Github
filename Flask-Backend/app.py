# reference: https://stackoverflow.com/questions/59975596/how-to-connect-javascript-to-python-script-with-flask

from flask import Flask, jsonify, request
from flask import render_template
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
list_data = []


# Display your index page
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/privacy")
def privacy():
    return render_template("privacy.html")


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
        # if 'Duplicate entry' in str(e):
        # If the document already exists, return the label associated with the link
        # label = read_document(link)
    return False


def update_document(link, label):
    try:
        cursor = mysql.connection.cursor()
        print('Updating document...')
        query = "UPDATE spoilers SET label = %s WHERE link = %s"
        cursor.execute(query, (label, link))
        mysql.connection.commit()
        print('Document updated successfully!')
    except Exception as e:
        print('Error updating document:', e)


def read_document(link):
    try:
        cursor = mysql.connection.cursor()
        print('Reading document...')
        query = "SELECT label FROM spoilers WHERE link = %s"
        cursor.execute(query, (link,))
        document = cursor.fetchone()
        label = document['label']
        print("Label for the document with the provided link:", label)
        return label

    except Exception as e:
        print('No such document!')
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
    global geminiRunning
    while geminiRunning:
        isGeminiRunning = "Gemini is running"

    # print("app started")

    recieved_data = request.json
    print("recieved data: " + str(recieved_data))

    text_data = recieved_data.get('text')
    link = recieved_data.get('link')

    runGemini = False

    try:
        cursor = mysql.connection.cursor()
        print('Reading document...')
        query = "SELECT label FROM spoilers WHERE link = %s"
        cursor.execute(query, (link,))
        document = cursor.fetchone()
        label = document['label']
        print("Label for the document with the provided link:", label)
        return label

    except Exception as e:
        print('No such document!')
        print('Error reading document:', e)

    # wait for 5 seconds to get the document created in the database
    # time.sleep(5)

    # create_document(text_data, link, 0)
    # time.sleep(5)

    preprocessed_text = preprocess_data(text_data)
    # print(preprocessed_text)

    # if (len(preprocessed_text) > 1000):
    #     print("Text is too long.")
    #     preprocessed_text = preprocessed_text[:1000]

    json_data = {
        "text": preprocessed_text,
        "label": 0
    }

    # print(json_data)

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

    # wait for 5 seconds
    # time.sleep(5)

    # print(response)
    geminiRunning = False

    # print(response.text)

    json_output = response.text.split('```')[1]

    # Replace single quotes with double quotes to make it a valid JSON string
    json_output = json_output.replace("'", '"')

    # Parse the JSON string into a dictionary
    json_output = json.loads(json_output)

    # Extract the label
    label = json_output['label']

    print("predicted label: " + str(label) + "\ncontent" + text_data)
    # Update the Firestore document with the predicted label

    if (label == 1 or label == 0):
        doc_being_created = create_document(text_data, link, label)
        # time.sleep(10)

    # change label to string
    label = str(label)
    print("label updated")
    return label


if __name__ == "__main__":
    app.run(debug=True)
