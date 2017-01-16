import xml.etree.ElementTree as ET

# root = ET.fromstring()
# for sentence in root:
#     for word in sentence:
#         print('"{}" is {}'.format(word.text, word.attrib['part-of-speech']))
#         syn = []
#         defs = []
#         for att, value in word.attrib.items():
#             if att.startswith('s'):
#                 syn.append(value)
#             if att.startswith('d'):
#                 defs.append(value)
#         print('Synonyms {}'.format(syn))
#         print('Definitions {}'.format(defs))

from NLG.generator import respond

print(respond('Ana are mere'))
print(respond('Thank you'))
print(respond('Hi'))
print(respond('Hello'))

# import requests
# from DecisionController import Controller
# r = requests.Session()
# response = r.get('http://ec2-52-213-135-23.eu-west-1.compute.amazonaws.com/api/v1/nltk/sentence-annotation?sentence={}'.format('Hello there nice to meet you'))
# print(response.json()['annotatedSentence'])
#
# c = Controller(response.json()['annotatedSentence'])
# c.processInput()

