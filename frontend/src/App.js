import React from 'react'
import './App.css'
import FileUpload from '../src/components/FileUpload/FileUpload'

const App = () => {
  return (
    <>
      <h1>Adding Candidates to Database</h1>
    <div className='container'>
        
      <FileUpload />
    </div>
    </>
  )
}

export default App