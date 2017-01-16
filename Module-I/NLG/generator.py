from parse_utils import parse_sentence, load_learned

word_freq = load_learned()


def respond(input_sentence):
    words = parse_sentence(input_sentence)
    scores = {}
    for word in words:
        max_freq = 0
        sum_freq = 0
        best_item = None
        for item in word_freq.get(word, []):
            _, freq = word_freq[word][item]
            if freq > max_freq:
                max_freq = freq
                sum_freq += freq
                best_item = item
        if sum_freq:
            temp = max_freq / sum_freq
            scores[best_item] = scores.get(best_item, 0) + temp
    if not scores:
        return '...'
    return max(scores, key=lambda k: scores[k])


if __name__ == '__main__':
    while True:
        x = input(">> ")
        print(respond(x))
