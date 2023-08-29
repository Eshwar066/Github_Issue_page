import { useState } from "react";
import "./NewIssue.scss";
import { Link } from "react-router-dom";

const NewIssue = () => {

  const [data, setData] = useState({ title: "", description: "" });
  // const [issueList, setIssueList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();


const existingIssues=JSON.parse(localStorage.getItem('issueData') || '[]')
if(data.title.length!==0){

  const newIssueList = [...existingIssues, data];
  localStorage.setItem("issueData", JSON.stringify(newIssueList));
}
    // setIssueList(newIssueList);

    // const min = 6000000;
    // const max = 10000000;
    // const randomAbove600000 = Math.floor(Math.random() * (max - min + 1)) + min;
    
    

    setData({ title: "", description: "" });
  }

  return (
    <div>
      <div className="new-issue-form">
        <h2>Create New Issue</h2>
        <Link to="/Issue"  style={{ 'textDecoration': 'none' }}>
        <button className="close">X</button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="input-group">
            <textarea
              id="comment"
              placeholder="Leave a comment"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
            
          </div>
          <button type="submit">Submit New Issue</button>
        </form>
      </div>
    </div>
  );
}

export default NewIssue;
