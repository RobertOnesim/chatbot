import gzip
import json
import os

from .settings import SENTENCES_REGEX, TRANSLATION, STOP_WORDS, REMOVE_MULTIPLE_LETTERS, PATH_SAVE_LEARNED, \
    PATH_SAVE_LIST


def read_subtitles(archive_path):
    with gzip.open(archive_path) as handle:
        content = handle.read().decode()
    return SENTENCES_REGEX.findall(content)


def parse_sentence(sentence):
    return standardise_words(remove_stop_words(sentence))


def remove_stop_words(sentence):
    # remove punctuation marks
    sentence = sentence.translate(TRANSLATION)

    # remove stop words
    sentence_words = sentence.lower().split()
    for count, word in enumerate(sentence_words):
        if word in STOP_WORDS:
            sentence_words[count] = None

    # return list of words
    return [word for word in sentence_words if word and word.strip()]


def standardise_words(words):
    # remove repeating group of letters
    for count in range(len(words)):
        for group_length in range(1, 5):
            match = REMOVE_MULTIPLE_LETTERS[group_length].search(words[count])
            if match:
                while match:
                    words[count] = words[count].replace(match.group(1), match.group(2))
                    match = REMOVE_MULTIPLE_LETTERS[group_length].search(words[count])
                continue
    return words


def load_remaining(load_path=PATH_SAVE_LIST):
    if os.path.isfile(load_path):
        with open(load_path, 'r') as handle:
            return json.load(handle)


def load_learned(load_path=PATH_SAVE_LEARNED):
    if os.path.isfile(load_path):
        with open(load_path, 'r') as handle:
            return json.load(handle)


def save_remaining(sub_list, load_path=PATH_SAVE_LIST):
    with open(load_path, 'w') as handle:
        handle.write(json.dumps([item for item in sub_list if item]))


def save_learned(words_freq, load_path=PATH_SAVE_LEARNED):
    with open(load_path, 'w') as handle:
        handle.write(json.dumps(words_freq))
