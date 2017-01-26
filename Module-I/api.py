import json

from flask import Flask, request, abort, Response, jsonify

from controller import Controller

app = Flask(__name__)

control = Controller()


# @app.route('/api/input', methods=['OPTIONS'])
# def test():
#     resp = Response('a', mimetype='text/html')
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     resp.headers['Access-Control-Allow-Headers'] = 'application/json'
#     return resp


@app.route('/api/input', methods=['POST'])
def get_input():
    data = request.get_json()
    if data is None:
        try:
            data = json.loads(request.data.decode('utf-8'))
        except Exception as e:
            print(str(e))
            abort(400)
    # if not request.json:
    #     abort(400)
    print(data)
    if 'user-key' in data and type(data['user-key']) != str:
        abort(400)
    if 'question' in data and type(data['question']) != str:
        abort(400)
    answer = control.getOutput(data.get('question', ''), data.get('user-key', ''))
    # return jsonify({'answer': answer})
    resp = Response(json.dumps({'answer': answer}), mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    # resp.headers['Access-Control-Allow-Headers'] = 'application/json'
    return resp


if __name__ == '__main__':
    app.run(port=5001, threaded=True)
