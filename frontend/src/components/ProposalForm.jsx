import React, { useState } from 'react';
import axios from 'axios';

function ProposalForm({ onSearch }) {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem('token');

  const handleFileChange = (e) => {
    setNotes(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('topic', topic);
    for (let i = 0; i < notes.length; i++) {
      formData.append('notes', notes[i]);
    }

    setLoading(true); // Set loading state to true

    axios
      .post('https://studyapplication.onrender.com/api/proposals', formData, {
        headers: {
          'x-token': token,
        },
      })
      .then((response) => {
        console.log('Proposal created:', response.data);
        // Handle successful response
        setSubject('');
        setTopic('');
        setNotes([]);
        onSearch(); // Trigger the search function to update the list
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred while submitting the form.'); // Set error message
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false
      });
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button onClick={toggleFormVisibility} className='submitbtn2'>{showForm ? 'Close Form' : 'Create Folder'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
          />
          <div style={{display:"flex",justifyContent:"space-between",margin:"1em"}} className='file-submit_btn-Container'>
            <input type="file" name="notes" accept="application/pdf" multiple onChange={handleFileChange} className='submitbtn1' />
            {error && <p>{error}</p>}
            <button type="submit" disabled={loading} className='submitbtn'>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProposalForm;
