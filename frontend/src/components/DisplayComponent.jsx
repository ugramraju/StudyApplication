import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProposalForm from './ProposalForm';
import Header from './headers/header';
import "./DisplayComponents.css";

const DisplayComponent = () => {
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProposals();
  });

  const fetchProposals = async () => {
    try {
      const response = await axios.get('https://studyapplication.onrender.com/api/proposals', {
        headers: {
          'x-token': token,
        }
      });
      const proposals = response.data.data;

      // Fetch the name for each proposal
      const populatedProposals = await Promise.all(
        proposals.map(async (proposal) => {
          const createdByResponse = await axios.get(`https://studyapplication.onrender.com/api/getproposals/${proposal._id}`);
          const createdByData = createdByResponse.data.data;
          return { ...proposal, createdBy: createdByData.createdBy };
        })
      );

      setSubmittedFiles(populatedProposals);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileClicked = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const deleteFile = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this File?");
      if (confirmed) {
        await axios.delete(`https://studyapplication.onrender.com/api/proposals/${id}`, {
          headers: {
            'x-token': token,
          }
        });
        fetchProposals(); // Refetch the proposals after deleting the file
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredFiles = submittedFiles.filter((file) => {
    const subjectMatch = file.subject.toLowerCase().includes(searchText.toLowerCase());
    const topicMatch = file.topic.toLowerCase().includes(searchText.toLowerCase());
    return subjectMatch || topicMatch;
  });

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header />
      <div className='Display_component_subject_topic'>
        <div className='heading_search_container'>
          <h1 className='submittedfiles_text'>Submitted Files:</h1>
          <ProposalForm onSearch={fetchProposals} />
          <div className='SearchBar'>
            <input
              type="text"
              placeholder="Search by Subject or Topic"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className='Display_component_subject'>
          {currentFiles.length > 0 ? (
            currentFiles.map((file, index) => (
              <div key={index} className="card">
                <div><b>Subject:</b> {file.subject}</div>
                <div><b>Topic:</b> {file.topic}</div>
                <div className='fileContainer'>
                  {file.notes.map((note, i) => (
                    <div key={i} className="fileContainer">
                      <button onClick={() => handleFileClicked(note)} className="opnbtn">Open File {i + 1}</button>
                      <div className="iframe_image_container">
                        <iframe  src={note.replace(/^http:/, 'https:')} title={`File ${i + 1}`} width="200" height="100" />
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => deleteFile(file._id)} className='deletebtn'>Delete File</button>
              </div>
            ))
          ) : (
            <div>No files found.</div>
          )}
        </div>
        {filteredFiles.length > filesPerPage && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className='prevButton'
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='nextButton'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayComponent;
