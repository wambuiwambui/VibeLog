from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from auth import auth

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///journal.db'  # SQLite database file
db = SQLAlchemy(app)

# Register the 'auth' blueprint with your main app
app.register_blueprint(auth, url_prefix='/auth')

# Define the database model for journal entries
class JournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    content = db.Column(db.Text)

# Initialize the database
with app.app_context():
    db.create_all()

#create database tables
with app.app_context():
    db.create_all()

@app.route("/api/")
def hello_world():
    # Return a JSON response
    return jsonify(message="Hello, World!")

# Define API routes

# Create a new journal entry
@app.route('/api/journal-entries/', methods=['POST'])
def create_journal_entry():
    data = request.json
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({"message": "Title and content are required"}), 400

    entry = JournalEntry(title=title, content=content)
    db.session.add(entry)
    db.session.commit()

    return jsonify({"message": "Journal entry created successfully"}), 201

# Retrieve all journal entries
@app.route('/api/journal-entries/', methods=['GET'])
def get_journal_entries():
    entries = JournalEntry.query.all()
    entries_list = [{"id": entry.id, "title": entry.title, "content": entry.content} for entry in entries]
    return jsonify({"entries": entries_list})

#Delete a journal entry by ID
@app.route('/api/journal-entries/<int:entry_id>', methods=['DELETE'])
def delete_journal_entry(entry_id):
    entry = JournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({"message": "Journal entry not found"}), 404

    db.session.delete(entry)
    db.session.commit()
    return jsonify({"message": "Journal entry deleted successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)

