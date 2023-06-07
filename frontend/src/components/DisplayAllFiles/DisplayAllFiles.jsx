import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from '../headers/userHeader';

const DisplayAllComponent = () => {
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10);

  useEffect(() => {
    fetchProposals();
  });

  const fetchProposals = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getproposals');
      const proposalData = response.data.data;
      setSubmittedFiles(proposalData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileClicked = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredFiles = submittedFiles.filter((file) => {
    const { subject, topic } = file;
    const searchQuery = searchText.toLowerCase();
    return (
      (subject && subject.toLowerCase().includes(searchQuery)) ||
      (topic && topic.toLowerCase().includes(searchQuery))
    );
  });

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <UserHeader />
      <div className='Display_component_subject_topic'>
        <div className='SearchBar'>
          <input
            type='text'
            placeholder='Search by Subject or Topic'
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='Display_component_subject'>
        {currentFiles.length > 0 ? (
          currentFiles.map((file, index) => {
            return (
              <div key={index} className='card'>
                <div>
                  <b>Subject:</b> {file.subject}
                </div>
                <div>
                  <b>Topic:</b> {file.topic}
                </div>
                <div className='fileContainer'>
                  {file.notes.map((note, i) => (
                    <div key={i} className='fileContainer'>
                      <button
                        onClick={() => handleFileClicked(note)}
                        className='opnbtn'
                      >
                        Open File {i + 1}
                      </button>
                      <div className='iframe_image_container'>
                        <iframe
                          src={note}
                          title={`File ${i + 1}`}
                          width='200'
                          height='100'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div>No files found.</div>
        )}
      </div>
      {filteredFiles.length > filesPerPage && (
        <div className='pagination'>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className='prevButton'
          >
            Previous
          </button>
          {Array.from(
            { length: Math.ceil(filteredFiles.length / filesPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={goToNextPage}
            disabled={currentPage === Math.ceil(filteredFiles.length / filesPerPage)}
            className='nextButton'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplayAllComponent;
