
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Issue from './Components/Issues/Issue';
import IssueDetails from './Components/IssueDetalis/IssueDetails'; 
import NewIssue from './Components/NewIssue/NewIssue';
import OwnIssueDetails from './Components/ownIssueDetails/OwnIsuueDetails';

function App() {
  return (
    <BrowserRouter>  
        <Routes>
          <Route path="/Issue" element={<Issue/>}/>
          <Route path="/ownIssueDetails/:index" element={<OwnIssueDetails/>}/>
          <Route path='/NewIssue' element={<NewIssue/>} /> 
          <Route  path="/" element={<Issue/>} />
          <Route path="/issue/:issueNumber" element={<IssueDetails/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
