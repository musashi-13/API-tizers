import schedule
import time
import subprocess

def run_scripts():
    subprocess.run(["python", "mail_parser.py"])
    subprocess.run(["python", "insert_db.py"])

# Schedule the scripts to run every hour
schedule.every(6).hours.do(run_scripts)

while True:
    schedule.run_pending()
    time.sleep(1)