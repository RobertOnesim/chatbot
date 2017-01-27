import json
import os
import sys
import xml.etree.ElementTree as ET

import requests

sys.path.append('neural_net')
from neural_net.chatbot.chatbot import Chatbot

USE_NLG = False

if USE_NLG:
    from NLG.generator import respond

AIML_BOT_PATH = os.path.join(os.path.dirname(__file__), r'aiml_brain\bot.py')


def enqueue_output(out, queue):
    for line in iter(out.readline, ''):
        queue.put(line)
    out.close()


class Controller:
    def __init__(self, ):

        os.chdir('neural_net')
        self.net = Chatbot()
        self.net.initResponseCall()
        os.chdir(os.path.dirname(__file__))

    def callAiml(self, question, user_key):

        ses = requests.Session()
        resp = ses.post('http://127.0.0.1:5000/api/aiml', json={'question': question, 'user-key': user_key})
        if resp.status_code == 200:
            ans = resp.json().get('answer', '')
            if ans:
                return ans
        return None

    def callNetwork(self, question):
        return self.net.getResponse(question)

    @staticmethod
    def parseXMLData(data):
        root = ET.fromstring(data)
        parsed = {}
        for sentence in root:
            for word in sentence:
                # print('"{}" is {}'.format(word.text, word.attrib['part-of-speech']))
                syn = []
                defs = []
                for att, value in word.attrib.items():
                    if att.startswith('s'):
                        syn.append(value)
                    if att.startswith('d'):
                        defs.append(value)
                # print('Synonyms {}'.format(syn))
                # print('Definitions {}'.format(defs))
                parsed[word.text] = {'syn': syn, 'def': defs, 'type': word.attrib['part-of-speech']}
        return parsed

    def processInput(self, input_data):
        result = self.parseXMLData(input_data)
        print(json.dumps(result, indent=3))

    def getOutput(self, question, user_key):
        try:
            ses = requests.Session()
            resp = ses.get(
                'http://ec2-52-213-135-23.eu-west-1.compute.amazonaws.com/api/v1/nltk/detect-language?message={}'.format(
                    question))
            if resp.status_code == 200 and resp.json():
                if not resp.json()['error']:
                    lang = resp.json().get('language', '')
                    if lang and lang != 'en':
                        resp = ses.get(
                            'http://ec2-52-213-135-23.eu-west-1.compute.amazonaws.com/api/v1/nltk/error-message?language={}'.format(
                                lang))
                        if resp.status_code == 200 and resp.json():
                            ans = resp.json().get('responseErrorMessage', '')
                            if ans:
                                return ans
        except:
            pass

        aimlResp = self.callAiml(question, user_key)
        print(aimlResp)
        netResp = self.callNetwork(question)
        print(netResp)
        if USE_NLG:
            nlgResp = respond(question)
            print(nlgResp)
        if aimlResp is not None:
            return aimlResp
        print('[i] Using neural network')
        return netResp


        # c = Controller()
        # print(c.getOutput('Sprachen Sie Deutsch?', 'asdasdas'))
