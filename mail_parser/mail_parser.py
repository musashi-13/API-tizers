import imaplib
import email
import yaml

#loading the credentials.yml file
with open("credentials.yml") as f:
    content = f.read()

#loading the contents of the file
my_credentials = yaml.load(content, Loader = yaml.FullLoader)
#fetching the user and password using exact keywords
user, password = my_credentials["user"], my_credentials["password"]

#URL for imap connection
imap_url ='imap.gmail.com'

#Connection to Gmail using SSl
my_mail = imaplib.IMAP4_SSL(imap_url)

#Log in using your credentials
my_mail.login(user, password)

#Select the inbox to fetch messages
my_mail.select('Inbox')


emails = ['bhatkaushik2004@gmail.com']
#These are modifications to simplify search
# we can define "value" which is the mail id whose emails we want to parse through
for mail_id in emails:
    key = 'FROM'
    value = mail_id
    _, data = my_mail.search(None , key , value)

    #data variable is a list of numbers that represents the mail id of the mails recieved from 'value' amongst all mails in the inbox
    mail_id_list = data[0].split()

    msgs = [] #empty list to capture all messages

    for num in mail_id_list:
        typ , data = my_mail.fetch(num,'(RFC822)')  #to extract every part of the message including the body and header
        msgs.append(data)
        
    '''
    In a multipart email, email.message.Message.get_payload() returns a list with one item for each part
    The easiest way is to walk the message and get the payload on each part
    '''
    #Note that each message has 

    for msg in msgs[::-1]:
        for response_part in msg:
            if type(response_part) is tuple:
                my_msg = email.message_from_bytes((response_part[1]))
                print("____________________")
                print("subj : ",my_msg['subject'])
                print("from : ",my_msg['from'])
                print("body : ")
                for part in my_msg.walk():
                    print(part.get_content_type())
                    if part.get_content_type() == 'text/plain':
                        print(part.get_payload())

my_mail.close()
my_mail.logout()