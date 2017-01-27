import json
from datetime import timedelta
from functools import update_wrapper

from flask import Flask, abort, Response, make_response, request, current_app, jsonify

from controller import Controller

app = Flask(__name__)

control = Controller()


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, str):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, str):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)

    return decorator


@app.route('/api/input', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
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
    return jsonify({'answer': answer})
    # resp = Response(json.dumps({'answer': answer}), mimetype='application/json')
    # resp.headers['Access-Control-Allow-Origin'] = '*'
    # resp.headers['Access-Control-Allow-Headers'] = 'application/json'
    # return resp


if __name__ == '__main__':
    app.run(port=5001, threaded=True)
