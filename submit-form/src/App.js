import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import SubmitProposal from './SubmitForm';

function App() {
  return (
    <div className="App">
      <SubmitProposal/>
      
      <ToastContainer
             position="top-right"
              autoClose={3000}
              hideProgressBar={false}
           newestOnTop={true}
             draggable/>
    </div>
  );
}

export default App;
