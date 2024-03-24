import schedule
import time
import subprocess

def run_scripts():
    subprocess.run(["python", "server.py"])
    subprocess.run(["python", "parser.py"])

# Schedule the scripts to run every hour
schedule.every().hour.do(run_scripts)

while True:
    schedule.run_pending()
    time.sleep(1)