
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Issue from './Components/Issues/Issue';
import IssueDetails from './Components/Issues/IssueDetails'; 

function App() {
  return (
    <BrowserRouter>  
        <Routes>
        <Route  path="/" element={<Issue/>} />
        <Route path="/issue/:issueNumber" element={<IssueDetails/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
