import imaplib
import email
import yaml
import json

def clean_subject(subject):
    if subject.lower().startswith('fwd: '):
        return subject[5:].lstrip()  # Remove "Fwd:" and any leading whitespace
    return subject

def get_email_body(msg):
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            if content_type == 'text/plain':
                body += part.get_payload(decode=True).decode()
    else:
        body = msg.get_payload(decode=True).decode()
    return body.strip()

def clean_email_body(body):
    # Initialize flags for sections to ignore
    ignore_sections = ['From:', 'To:', 'Subject: Requesting app and mail notification', '-- ']

    # Split the body into lines
    body_lines = body.splitlines()

    # Initialize a list to store clean lines
    clean_lines = []

    # Flag to ignore lines within unwanted sections
    ignore_line = False

    # Iterate through each line in the body
    for line in body_lines:
        # Check if the line starts with any of the ignore sections
        if any(line.startswith(section) for section in ignore_sections):
            ignore_line = True
        elif ignore_line and line.strip() == '':
            # If it's an empty line after an ignored section, reset the ignore flag
            ignore_line = False
        elif not ignore_line:
            # Ignore lines containing "Forwarded message" and similar patterns
            if 'Forwarded message' not in line:
                if line.strip():
                    clean_lines.append(line)

    # Join the clean lines to form the cleaned body
    cleaned_body = '\n'.join(clean_lines)

    return cleaned_body.strip()


# loading the credentials.yml file
with open("credentials.yml") as f:
    content = f.read()

# loading the contents of the file
my_credentials = yaml.load(content, Loader=yaml.FullLoader)
# fetching the user and password using exact keywords
user, password = my_credentials["user"], my_credentials["password"]

# URL for imap connection
imap_url = 'imap.gmail.com'

# Connection to Gmail using SSL
my_mail = imaplib.IMAP4_SSL(imap_url)

# Log in using your credentials
my_mail.login(user, password)

# Select the inbox to fetch messages
my_mail.select('Inbox')

emails = ['bhatkaushik2004@gmail.com']
parsed_mails = []  # List to store parsed emails

# These are modifications to simplify search
# we can define "value" which is the mail id whose emails we want to parse through
for mail_id in emails:
    key = 'FROM'
    value = mail_id
    _, data = my_mail.search(None, key, value)

    # data variable is a list of numbers that represents the mail id of the mails received from 'value' amongst all mails in the inbox
    mail_id_list = data[0].split()

    msgs = []  # empty list to capture all messages

    for num in mail_id_list:
        typ, data = my_mail.fetch(num, '(RFC822)')  # to extract every part of the message including the body and header
        msgs.append(data)

    '''
    In a multipart email, email.message.Message.get_payload() returns a list with one item for each part
    The easiest way is to walk the message and get the payload on each part
    '''
    # Note that each message has

    for msg in msgs[::-1]:
        for response_part in msg:
            if isinstance(response_part, tuple):
                my_msg = email.message_from_bytes(response_part[1])
                subject = my_msg['subject']
                cleaned_subject = clean_subject(subject)
                body = get_email_body(my_msg)

                # Clean email body using custom logic
                cleaned_body = clean_email_body(body)

                parsed_email = {
                    "subject": cleaned_subject,
                    "body": cleaned_body
                }

                # Store each parsed email dictionary in the list
                parsed_mails.append(parsed_email)

# Print or use parsed emails as needed
'''
i = 1
for parsed_mail in parsed_mails:
    print("Mail",i,"\n")
    i+=1
    print(parsed_mail)
    print("\n\n")
'''

with open('parsed_mails.json', 'w') as json_file:
    json.dump(parsed_mails, json_file)

my_mail.close()
my_mail.logout()