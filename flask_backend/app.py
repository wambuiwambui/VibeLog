from flask import Flask, jsonify
from config import init_app, db
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
cors = CORS(app)

#load database configuration
init_app(app)

#create database tables
with app.app_context():
    db.create_all()

@app.route("/api/")
def hello_world():
    # Return a JSON response
    return jsonify(message="Hello, World!")



if __name__ == "__main__":
    app.run(debug=True, port=5001)

