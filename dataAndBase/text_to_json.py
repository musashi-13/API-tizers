import json

# Read the content of generated_text.txt
with open('generated_text.txt', 'r') as file:
    content = file.read()

# Split the content into individual JSON objects
json_objects = content.strip().split('\n\n')

# Filter out only the valid JSON objects
valid_json_objects = []
for obj in json_objects:
    try:
        json_data = json.loads(obj)
        if isinstance(json_data, dict):
            valid_json_objects.append(json_data)
    except json.JSONDecodeError:
        pass  # Skip invalid JSON objects

# Write the valid JSON objects to events.json
with open('events.json', 'w') as output_file:
    json.dump(valid_json_objects, output_file, indent=2)
