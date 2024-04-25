import React, { useState } from 'react';
import axios from 'axios';
import { MdCloudUpload } from 'react-icons/md';
import './FileUpload.css'; 

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name); // Set the name of the uploaded file
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setUploading(true); // Set uploading state to true

    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:5000/importUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadSuccess(true); // Set upload success state to true
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false); // Set uploading state to false
      setFileName(''); // Reset the fileName state variable
    }
  };

  return (
    <div className='form'>
      {uploadSuccess ? (
        <div>
          <p style={{ color: 'green' }}>Thank you!</p>
          <p>✔️ File successfully uploaded</p>
          <p>Your records will be processed shortly</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor='fileInput'>
            <MdCloudUpload color='#1475cf' size={60} />
            <div>Upload your file here</div>
          </label>
          <input
            id='fileInput'
            type='file'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {file && <div>Selected file: {fileName}</div>}
          {uploading && <div>Uploading...</div>}
          <button type='submit' className='button'>Submit</button>
        </form>
      )}
    </div>
  );
}

export default FileUpload;
