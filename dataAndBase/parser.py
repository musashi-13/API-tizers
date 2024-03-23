import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API"))
model = genai.GenerativeModel('gemini-pro')

with open('mongodb_data.json') as f:
    data_list = json.load(f)


ans =""
# Loop through each JSON object
for data in data_list:
    # Concatenate subject and body to form the prompt
        prompt = f"{data['subject']}. {data['body']}"
        combined_prompt = f"{prompt}. For each entry in this database , give me the following attributes: 1)Give me the event name,event location,event date and time, event restrictions if it is open for all or only for pes students,last date for signing up. 2)Create the following fields as mentioned before and provide the necessary information after reading the database , if there is no such attribute/keyword in that event then return N.A for that event attribute. All of the above things that i have mentioned give in json format"
        response = model.generate_content(combined_prompt)
        generated_text = response.text
        ans += generated_text + '\n'

        
with open('generated_text.txt', 'w') as file:
        file.write(ans)