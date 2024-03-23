from pymongo import MongoClient
import json
from urllib.parse import quote_plus

# MongoDB Atlas credentials (replace with your actual credentials)
username = "syncdmailparser"
password = "mailparser@@"
dbname = "events"
collection_name = "event_info"

# Escape special characters in username and password
escaped_username = quote_plus(username)
escaped_password = quote_plus(password)

# MongoDB Atlas connection URI with escaped credentials
uri = f"mongodb+srv://{escaped_username}:{escaped_password}@syncd.sfknoqc.mongodb.net/{dbname}?retryWrites=true&w=majority&appName=syncd"

# Initialize MongoDB client and connect to your MongoDB Atlas cluster
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Select the database and collection
db = client[dbname]
collection = db[collection_name]

# Read parsed_mails from the JSON file
with open('events.json') as json_file:
    parsed_events = json.load(json_file)

for parsed_event in parsed_events:
    existing_doc = collection.find_one({"event_name": parsed_event.get("event_name")})
    if existing_doc is None:
        result = collection.insert_one(parsed_event)

# Close the MongoDB connection
client.close()
