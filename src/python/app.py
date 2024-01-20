# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import shlex

app = Flask(__name__)
CORS(app)

@app.route('/run-python-code', methods=['POST', 'OPTIONS'])
def run_python_code():
    if request.method == 'OPTIONS':
        # Respond to the CORS pre-flight request
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    code = request.json.get('code', '')

    try:
        process = subprocess.Popen(
            ['python3', '-'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )

        # Pass the code to the subprocess
        process.stdin.write(code)
        process.stdin.close()

        # Capture the output and errors
        output, error = process.communicate()

        if process.returncode == 0:
            return jsonify({'output': output})
        else:
            return jsonify({'error': error})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5001)
