from twitter import Api as TwitterApi
from nltk.tag import pos_tag
from chatterbot import ChatBot
import aiml
import cPickle
import os
import urllib
import nltk
import json


APP_PATH = os.path.dirname(__file__)


class Responder:
    def __init__(self, **kwargs):
        nltk.download("averaged_perceptron_tagger")
        self.twitter = TwitterApi(
            consumer_key=kwargs.get("twitter_consumer_key"),
            consumer_secret=kwargs.get("twitter_consumer_secret"),
            access_token_key=kwargs.get("twitter_access_token_key"),
            access_token_secret=kwargs.get("twitter_access_token_secret")
        )
        self.google_service_url = 'https://kgsearch.googleapis.com/v1/entities:search?'
        self.google_params = {
            'limit': 1,
            'indent': True,
            'key': "AIzaSyDML6wf5I7tdkyPdNq-gPT4zUtPiZgRudE",
        }
        self.kernel = self._get_kernel()
        self.chatbot = self._get_chatterbot()
        self.sessions_path = kwargs.get("sessions_path")

    def _get_kernel(self):
        kernel = aiml.Kernel()
        kernel.learn(os.path.join(APP_PATH, "std-startup.xml"))
        kernel.respond('load aiml b')
        """for(root, directories, files) in os.walk("../../Module-II/aiml"):
            for file in files:
                full_path = os.path.join(root, file)
                if os.path.splitext(full_path)[1] == ".aiml":
                    kernel.learn(full_path)"""
        return kernel

    def _get_chatterbot(self):
        chatbot = ChatBot(
            "Twitter",
            loginc_adapters=[
                "chatterbot.logic.BestMatch"
            ],
            database="twitter-database.db",
            statement_comparison_function="chatterbot.comparisons.synset_distance"

        )
        return chatbot

    def get_response(self, sentence, session_id):
        response = self.get_aiml_response(sentence, session_id)
        if len(response) == 0:
            response = self.get_google_knowledge_graph_response(sentence)
            if len(response) == 0:
                return None

        return response

    def get_aiml_response(self, sentence, session_id):
        return self.kernel.respond(sentence, sessionID=session_id)

    def get_chatterbot_response(self, sentence, session_id):
        return self.chatbot.get_response(sentence, session_id=session_id)

    def get_google_knowledge_graph_response(self, sentence):
        sentence = sentence.replace(",", " is ")
        tagged_sent = pos_tag(sentence.split())
        index = 0
        propernouns = []

        while index < len(tagged_sent):
            name = ""
            while (index < len(tagged_sent)) and (tagged_sent[index][1] == 'NNP'):
                name += tagged_sent[index][0] + " "
                index += 1
            if name != '':
                propernouns += [name]
            index += 1

        mx = 0.0
        text_max = ""

        for query in propernouns:
            self.google_params["query"] = query
            url = self.google_service_url + urllib.urlencode(self.google_params)
            response = json.loads(urllib.urlopen(url).read())
            if response is not None:
                try:
                    score = response[u'itemListElement'][0][u'resultScore']
                    if score > mx:
                        mx = score
                        text_max = response[u'itemListElement'][0][u'result'][u'detailedDescription'][u'articleBody']
                except:
                    pass

        return text_max

    def dump_session(self, session_id):
        try:
            file_path = os.path.join(self.sessions_path, session_id + ".p")
            open(file_path, "wb").write(cPickle.dumps(
                self.kernel._sessions[session_id]))
            self.kernel._sessions.pop(session_id)
        except Exception as e:
            pass

    def load_session(self, session_id):
        try:
            file_path = os.path.join(self.sessions_path, session_id + ".p")
            self.kernel._sessions[session_id] = cPickle.load(
                open(file_path, "rb"))
        except Exception as e:
            pass
