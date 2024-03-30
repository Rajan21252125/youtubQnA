from flask import Flask, request, jsonify
from main import qna
from gsearch import results
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={"/*": {"origins": "*"}})


@app.route("/", methods=['GET'])
def home():
    return "Welcome to the QnA API!"

@app.route("/api", methods=["POST"])
def questionAns():
    id = request.json["id"]
    question = request.json["question"]  # Extract question from request
    answer = qna(question,id)
    return jsonify(answer)



@app.route("/gsearch", methods=["POST"])
def gog_ser():
    query = request.json["query"]
    gs = results(query)
    return jsonify(gs)

if __name__ == "__main__":
    app.run(debug=True)  # Start the Flask development server
