import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API"))
model = genai.GenerativeModel('gemini-pro')

with open('mongodb_data.json') as f:
    data_list = json.load(f)

generated_data = []

# Loop through each JSON object
for data in data_list:
    # Concatenate subject and body to form the prompt
    prompt = f"{data['subject']}. {data['body']}"
    combined_prompt = f"{prompt}. For each entry in this database, give me the following attributes: 1) Event name, event location, event date and time, event restrictions if it is open for all or only for PES students, last date for signing up. 2) Create the following fields as mentioned before and provide the necessary information after reading the database. If there is no such attribute/keyword in that event then return N.A for that event attribute. All of the above things that I have mentioned give in JSON format, keep the key value pair consistent such as 'event name' will remain 'event name' for all events in the database.Also if only date is there or only time is there for a given event, still display it in event date and time attribute regardless if neither are present then only give N.A value to it. All the keys specified are mandatory and should be included in each event. give only values with following keys: 1) event name 2)event location 3)event date and time 4)event restrictions 5)last date for signing up. If any of the attribute information isnt present in the subject and body of the json file give the value as N.A. DOUBLE CHECK IF YOU HAVE CORRECTLY READ THROUGH THE EVENTS AS IT SEEMS LIKE YOU ARE MISSING FEW EVENTS AND ITS DESCRIPTIONS.For the event name give first priority to the subject of the json body, if there is no suitable event name then go through the body attribute to fetch further data , but if you feel the event name is in the subject itself return that as event name. " 
    
    response = model.generate_content(combined_prompt)
    generated_text = response.text
    
    generated_text = generated_text.replace("\"", "")
    
    # Parse the generated text to extract event details
    event_details = {}
    lines = generated_text.split('\n')
    for line in lines:
        # Split the line by colon
        parts = line.split(':')
        if len(parts) == 2:  # Ensure there are exactly two parts
            key, value = parts
            event_details[key.strip()] = value.strip()
    print("Event details:", event_details)
    # Create a dictionary for the generated data
    generated_object = {
        "event_name": event_details.get('event name',"N.A"),
        "event_location": event_details.get('event location', "N.A"),
        "event_date": event_details.get('event date and time', "N.A"),
        "event_restrictions": event_details.get('event restrictions"', "N.A"),
        "last_date_for_signing_up": event_details.get('last date for signing up', "N.A")
    }
    
    # Append the generated object to the list
    generated_data.append(generated_object)

# Write the generated data to a JSON file
with open('generated_data.json', 'w') as file:
    json.dump(generated_data, file, indent=4)

print('Generated data has been saved to generated_data.json')
