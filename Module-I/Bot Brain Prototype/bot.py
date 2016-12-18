import aiml
import os
import cPickle
from chatterbot import ChatBot
#import autocorrect
import sys

chatbot = ChatBot("Twitter",
                  logic_adapters=[
                      "chatterbot.logic.BestMatch"
                  ],
                  database="./twitter-database.db",
                  )

def dump_session(user_id):
    try:
        file_path = os.path.join(sessions_path, user_id + ".p")
        open(file_path, "wb").write(cPickle.dumps(kernel._sessions[user_id]))
        kernel._sessions.pop(user_id)
    except:
        pass


def load_session(user_id):
    try:
        file_path = os.path.join(sessions_path, user_id + ".p")
        kernel._sessions[user_id] = cPickle.load(open(file_path, "rb"))
    except:
        pass


def load_aiml():
    temp_kernel = aiml.Kernel()

    """kernel.learn("std-startup.xml")
    kernel.respond("load aiml b")"""
    temp_kernel.learn("test.aiml")
    for (root, directories, files) in os.walk("../../Module-II/aiml"):
        for file_name in files:
            full_path = os.path.join(root, file_name)
            if os.path.splitext(full_path)[1] == ".aiml":
                temp_kernel.learn(full_path)
    return temp_kernel


def get_best_match_from_twitter(command):
    return chatbot.get_response(command)


def main():
    global sessionID
    while True:
        command = raw_input("Enter your message >> ")
        args = command.split()
        if args[0] == "login":
            load_session(args[1])
            sessionID = args[1]
            print "Hi " + args[1]
        elif args[0] == "quit":
            dump_session(sessionID)
            print "Goodbye"
            exit(1)
        elif args[0] == "logout":
            dump_session(sessionID)
            print "Goodbye " + sessionID
            sessionID = None
        else:
            response = kernel.respond(command, sessionID=sessionID)
            if len(response) == 0:
                print(get_best_match_from_twitter(command))
            else:
                print response
                # kernel.setPredicate("dog", kernel.getPredicate("dog"), sessionID)


# sys.stderr = open("stderr.txt", "w")
sessions_path = os.path.abspath("sessions")
kernel = load_aiml()
sessionID = None

try:
    main()
finally:
    if sessionID is not None:
        dump_session(sessionID)
