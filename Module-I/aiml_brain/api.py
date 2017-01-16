import os

import responder
from flask import Flask, request, jsonify, abort

app = Flask(__name__)
# sys.stderr = open("stderr.txt", "w")
response_gen = responder.Responder(
    twitter_consumer_key="",
    twitter_consumer_secret="",
    twitter_access_token_key="",
    twitter_access_token_secret="",
    google_key="",
    sessions_path=os.path.abspath("sessions")
)


@app.route('/api/aiml', methods=['POST'])
def get_input():
    data = request.get_json()

    if not request.json:
        abort(400)
    if 'user-key' in data and type(data['user-key']) != unicode:
        abort(400)
    if 'question' in data and type(data['question']) != unicode:
        abort(400)
    print(data)
    response_gen.load_session(data['user-key'])
    answer = response_gen.get_response(data['question'], data['user-key'])
    response_gen.dump_session(data['user-key'])
    return jsonify({'answer': answer})


if __name__ == '__main__':
    app.run()
