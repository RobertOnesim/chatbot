from parse_utils import *


def get_all_subtitles(sub_dir=SUBTITLES_DIR):
    listing = []
    for item in sorted(os.listdir(sub_dir), reverse=True):
        full_path = os.path.join(sub_dir, item)
        if os.path.isdir(full_path):
            listing = listing + get_all_subtitles(full_path)
        elif os.path.isfile(full_path):
            if not item.endswith('.gz'):
                continue
            listing.append(full_path)
    return listing


def learn():
    # load progress
    subtitles_list = load_remaining() or get_all_subtitles()
    words_freq = load_learned() or {}

    # continue learning
    counter = 0
    for count_subtitles, subtitles in enumerate(subtitles_list):
        # print number of subtitles parsed
        counter += 1
        print(counter)

        sub_list = [REMOVE_BULLSHIT.sub(' ', s) for s in read_subtitles(subtitles)]
        for count in range(len(sub_list) - 1):
            current_sentence = sub_list[count]
            if '{\\*' in current_sentence:
                print(subtitles)
            next_sentence = sub_list[count + 1]
            parsed = parse_sentence(current_sentence)
            parsed_length = len(parsed)
            for word in parsed:
                if word not in words_freq:
                    words_freq[word] = {next_sentence: [1, 1 / parsed_length]}
                else:
                    this_sentence_data = words_freq[word].get(next_sentence, [0, 0])
                    words_freq[word][next_sentence] = [this_sentence_data[0] + 1,
                                                       (this_sentence_data[0] * this_sentence_data[1] +
                                                        1 / parsed_length) / (this_sentence_data[0] + 1)]

        # remove the subtitle we have just learned
        subtitles_list[count_subtitles] = None

        # save progress
        if not count_subtitles % 10000:
            save_remaining(subtitles_list)
            save_learned(words_freq)

    # save last progress
    save_remaining(subtitles_list)
    save_learned(words_freq)
