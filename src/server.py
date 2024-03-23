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

# Define the path for the output JSON file
output_file_path = "mongodb_data.json"

# Convert ObjectId to string for JSON serialization
def json_serial(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError("Type not serializable")

# Open the output JSON file in write mode
with open(output_file_path, "w", encoding="utf-8") as output_file:
    # Iterate over documents and write each one to the JSON file
    for document in documents:
        json.dump(document, output_file, default=json_serial)
        output_file.write("\n")  # Add a newline between documents

# Close the MongoDB connection
client.close()

print(f"Data has been saved to '{output_file_path}'")
