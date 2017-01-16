"""import autocorrect
import sys"""
import responder
import os


def main():
    global sessionID
    while True:
        command = raw_input("Enter your message >> ")
        args = command.split()
        if args[0] == "login":
            response_gen.load_session(args[1])
            sessionID = args[1]
            print("Hi " + args[1])
        elif args[0] == "quit":
            response_gen.dump_session(sessionID)
            print("Goodbye")
            exit(1)
        elif args[0] == "logout":
            response_gen.dump_session(sessionID)
            print("Goodbye " + sessionID)
            sessionID = None
        else:
            print(response_gen.get_response(command, sessionID))


# sys.stderr = open("stderr.txt", "w")
response_gen = responder.Responder(
    twitter_consumer_key="",
    twitter_consumer_secret="",
    twitter_access_token_key="",
    twitter_access_token_secret="",
    google_key="",
    sessions_path=os.path.abspath("sessions")
)
sessionID = None

try:
    main()
finally:
    if sessionID is not None:
        response_gen.dump_session(sessionID)
