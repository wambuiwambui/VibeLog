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
  }, [entries]);

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

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '4px',
    backgroundColor: '#1877f2', // Facebook blue
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>Journal</h2>
      <div>
        <input
          style={inputStyle}
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <textarea
          style={inputStyle}
          placeholder="Content"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        />
        <button
          style={buttonStyle}
          onClick={createEntry}
        >
          Create Entry
        </button>
      </div>
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <button
              style={buttonStyle}
              onClick={() => deleteEntry(entry.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;

