from flask import jsonify, request, Blueprint
from config import db
from models.models import JournalEntry

#Create Blueprint for journals
journals = Blueprint('journals', __name__)

# Create a new journal entry
@journals.route('/journal-entries/', methods=['POST'])
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
@journals.route('/journal-entries/', methods=['GET'])
def get_journal_entries():
    entries = JournalEntry.query.all()
    entries_list = [{"id": entry.id, "title": entry.title, "content": entry.content} for entry in entries]
    return jsonify({"entries": entries_list})

#retrieve specific journal
@journals.route('/journal-entries/<int:entry_id>', methods=['GET'])
def get_journal_entry(entry_id):
    entry= JournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({"message": "Journal entry not found"}), 404
    
    entry_data ={"id": entry.id, "title": entry.title, "content": entry.content, "user_id": entry.user_id}
    return jsonify(entry_data)

#Delete a journal entry by ID
@journals.route('/journal-entries/<int:entry_id>', methods=['DELETE'])
def delete_journal_entry(entry_id):
    entry = JournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({"message": "Journal entry not found"}), 404

    db.session.delete(entry)
    db.session.commit()
    return jsonify({"message": "Journal entry deleted successfully"}), 200
