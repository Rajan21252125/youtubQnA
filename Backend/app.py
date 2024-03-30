from flask import Flask, request, jsonify
from main import qna
from Backend.gsearch import search
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={"/api/*": {"origins": "*"}})


@app.route("/", methods=['GET'])
def home():
    return "Welcome to the QnA API!"

@app.route("/api", methods=["POST"])
def questionAns():
    id = request.json["id"]
    question = request.json["question"]  # Extract question from request
    answer = qna(question,id)
    return jsonify({"answer": answer})  # Return answer as JSON

<<<<<<< HEAD
=======
@app.route("/gsearch", method=["POST"])
def gog_ser():
    query = request.json["query"]
    gs = search(query)
    return gs
>>>>>>> 2a13d5e545d1a07e966213870735f208e45371db

if __name__ == "__main__":
    app.run(debug=True)  # Start the Flask development server
