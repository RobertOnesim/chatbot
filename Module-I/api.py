from flask import Flask, request, abort, jsonify

from controller import Controller

app = Flask(__name__)

control = Controller()


@app.route('/api/input', methods=['POST'])
def get_input():
    if not request.json:
        abort(400)
    if 'user-key' in request.json and type(request.json['user-key']) != str:
        abort(400)
    if 'question' in request.json and type(request.json['question']) != str:
        abort(400)
    answer = control.getOutput(request.json['question'], request.json['user-key'])
    return jsonify({'answer': answer})


if __name__ == '__main__':
    app.run(port=5001, threaded=True)
