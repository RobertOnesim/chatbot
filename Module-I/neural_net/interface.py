from chatbot import chatbot


def get_chatbot(self):
    cbot = chatbot.Chatbot()
    cbot.initResponseCall()
    return cbot
