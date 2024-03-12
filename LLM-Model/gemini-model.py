"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

import pandas as pd
import google.generativeai as genai

genai.configure(api_key="AIzaSyAVXflbZLBt9XILv5om1PGgCYc5NHxDcbs")

model = genai.GenerativeModel('gemini-pro')

df = pd.read_csv('./LLM-Model/preprocessed_data.tsv', sep='\t')
df['label'] = [0] * len(df)

json_data = df.to_json(orient='records')

prompt = (f"""
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
response = model.generate_content(prompt)

print(response.text)

# Extract the JSON code from the conversation's last text
json_output = response.text.split('```')[1].strip()

# Convert JSON code back to DataFrame
output_df = pd.read_json(json_output)

# Save the DataFrame to a TSV file called 'predictions.tsv'
output_df.to_csv('./LLM-model/predictions.tsv', sep='\t', index=False)
