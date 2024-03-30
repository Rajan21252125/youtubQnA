from flask import Flask, request, jsonify
from main import qna
<<<<<<< HEAD
from gsearch import results
=======
from Backend.gsearch import search
>>>>>>> 077e2fcaf9ee2f1d487e6b67fe2effcd9b930cc5
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
<<<<<<< HEAD
    gs = results(query)
    return jsonify(gs)
=======
    gs = search(query)
    return gs
>>>>>>> 2a13d5e545d1a07e966213870735f208e45371db
>>>>>>> 077e2fcaf9ee2f1d487e6b67fe2effcd9b930cc5

if __name__ == "__main__":
    app.run(debug=True)  # Start the Flask development server
