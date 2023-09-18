import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  useEffect(() => {
    // Fetch journal entries
    axios.get('http://127.0.0.1:5001/api/journal-entries/', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    })
      .then((response) => {
        setEntries(response.data.entries);
      })
      .catch((error) => {
        console.error('Error fetching entries:', error);
      });
  }, []);

  const createEntry = () => {
    // Send a POST request to create a new entry
    axios.post('http://127.0.0.1:5001/api/journal-entries/', newEntry, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    })
      .then((response) => {
        setEntries([...entries, response.data]);
        setNewEntry({ title: '', content: '' });
      })
      .catch((error) => {
        console.error('Error creating entry:', error);
      });
  };

  const deleteEntry = (id) => {
    // Send a DELETE request to delete an entry
    axios.delete(`http://127.0.0.1:5001/api/journal-entries/${id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    })
      .then(() => {
        setEntries(entries.filter((entry) => entry.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting entry:', error);
      });
  };

  return (
    <div>
      <h2>Journal</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        />
        <button onClick={createEntry}>Create Entry</button>
      </div>
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;
