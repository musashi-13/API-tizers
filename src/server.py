from pymongo import MongoClient
from urllib.parse import quote_plus
import json
from bson import ObjectId

# MongoDB Atlas credentials (replace with your actual credentials)
username = "syncdmailparser"
password = "mailparser@@"
dbname = "mail"
collection_name = "event_info"

escaped_username = quote_plus(username)
escaped_password = quote_plus(password)

# MongoDB Atlas connection URI with escaped credentials
uri = f"mongodb+srv://{escaped_username}:{escaped_password}@syncd.sfknoqc.mongodb.net/{dbname}?retryWrites=true&w=majority&appName=syncd"

# Initialize MongoDB client and connect to your MongoDB Atlas cluster
client = MongoClient(uri)

# Select the database and collection
db = client[dbname]
collection = db[collection_name]

# Retrieve documents from the collection
documents = collection.find()

# Create an empty list to store the JSON-formatted documents
json_documents = []

# Convert ObjectId to string for JSON serialization
def json_serial(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError("Type not serializable")

# Iterate over documents and append each JSON-formatted document to the list
for document in documents:
    json_document = json.loads(json.dumps(document, default=json_serial))
    json_documents.append(json_document)

# Define the path for the output JSON file
output_file_path = "mongodb_data.json"

# Open the output JSON file in write mode and write the entire list to the file
with open(output_file_path, "w", encoding="utf-8") as output_file:
    json.dump(json_documents, output_file, default=json_serial, indent=2)  # Use indent for pretty formatting

# Close the MongoDB connection
client.close()

print(f"Data has been saved to '{output_file_path}'")