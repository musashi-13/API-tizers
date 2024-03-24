import schedule
import time
import subprocess

def run_scripts():
    subprocess.run(["python", "server.py"])
    subprocess.run(["python", "parse_ai.py"])
    subprocess.run(["python", "final_insert.py"])

# Schedule the scripts to run every hour
schedule.every(20).seconds.do(run_scripts)

while True:
    schedule.run_pending()
    time.sleep(1)