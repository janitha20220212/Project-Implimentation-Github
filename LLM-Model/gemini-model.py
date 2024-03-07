"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

import pandas as pd
import google.generativeai as genai

genai.configure(api_key="AIzaSyAVXflbZLBt9XILv5om1PGgCYc5NHxDcbs")

# Set up the model
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[
])


df = pd.read_csv('./LLM-Model/preprocessed_data.tsv', sep='\t')
df['label'] = [0] * len(df)

json_data = df.to_json(orient='records')

convo.send_message(f"""
You are an expert in detection, who is good at classifying a text in to actual spoiler or not.
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

# Extract the JSON code from the conversation's last text
json_output = convo.last.text.split('```')[1].strip()

# Convert JSON code back to DataFrame
output_df = pd.read_json(json_output)

# Save the DataFrame to a TSV file called 'predictions.tsv'
output_df.to_csv('./LLM-model/predictions.tsv', sep='\t', index=False)
