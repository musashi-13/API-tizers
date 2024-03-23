import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API"))
model = genai.GenerativeModel('gemini-pro')

with open('mongodb_data.json') as f:
    data_list = json.load(f)

ans = ""
# Loop through each JSON object
for data in data_list:
    # Concatenate subject and body to form the prompt
        prompt = f"{data['subject']}. {data['body']}"
        combined_prompt = f"{prompt}. From this information give me the following attributes: 1)Give me the event name,event location,event date and time, event restrictions if it is open for all or only for pes students,last date for signing up and event registration link  2)Create the following fields as mentioned before and provide the necessary information after reading the database , if there is no such attribute/keyword in that event then return null for that event attribute. All of the above things that i have mentioned give in json format"
        response = model.generate_content(combined_prompt)
        generated_text = response.text
        ans += generated_text + '\n'

prompt = ans + "\nConvert this to valid json format type text please, that is [{},{},{},{}] format"
response = model.generate_content(prompt)
ans = response.text

start_index = ans.find('```json')
end_index = ans.find('```', start_index + 1)
if start_index != -1 and end_index != -1:
    ans = ans[start_index + len('```json'):end_index]

with open('generated_text.txt', 'w') as file:
    file.write(ans)

# Parse the modified text as JSON data
json_data = json.loads(ans)

# Write the JSON data to events.json
with open('events.json', 'w') as file:
    json.dump(json_data, file, indent=2)