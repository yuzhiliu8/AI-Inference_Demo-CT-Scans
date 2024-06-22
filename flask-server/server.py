from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess

app = Flask(__name__)
CORS(app)

uploads = 'UPLOADED_FILES'
app.config['uploads'] = uploads

@app.route("/")
def run():
    return "Hello World!"

@app.route("/get-inference", methods=['GET', 'POST'])
def get_inference():
    if request.method == 'GET':
        return ''
    if 'file' not in request.files:
        return jsonify({"STATUS": "ERROR: No file uploaded"})
    file = request.files['file']
    if file.filename == "":
        return jsonify({"STATUS": "ERROR: Uploaded blank File"})
    filename = file.filename
    file.save(os.path.join(app.config['uploads'], filename))
    return jsonify({"STATUS": "OK, file uploaded"})

if __name__ == "__main__":
    app.run(debug=True)

#flask-server\aorta.nii
#flask-server\output
#qchen99/suprem:v1 /bin/bash -c "sh predict.sh"