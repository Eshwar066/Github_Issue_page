import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OwnIssueDetails.scss";

const OwnIssueDetails = () => {
    const { index } = useParams();
    console.log(index);
    const [newData, setNewData] = useState([]);
    // const [issue, setIssue] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem("issueData");
        if (savedData) {
            setNewData(JSON.parse(savedData));
        }

       
    }, []);

    useEffect(() => {
        const storedIssues = JSON.parse(localStorage.getItem('issues') || '[]');
        setComments(storedIssues);
       
    }, []);
 
    const validIndex = parseInt(index, 10);
    if (isNaN(validIndex) || validIndex < 0 || validIndex >= newData.length) {
        console.log('Invalid index');
        return null;
    }
 
    const commentres = newData[validIndex];
    // console.log(commentres);



    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment.trim() !== '') {
            setComments([...comments, { id: comments.length + 1, body: comment, user: { login: 'You' } }]);
            setComment('');
        }
    };

    return (
        <div className="container">
            <h1>Issue Details</h1>
            
            <div>
            {commentres &&(
            <div>
            <h2>{commentres.title}</h2>
                        <p>login: you</p>
                        <p>Issue Number: #{commentres.id}</p>
                        <p>Status: open</p>
                        {/* <p>Created At: {new Date()}</p>
                        <p>Updated At: {new Date()}</p> */}
                        
                        </div>)

            }    
            </div>            


            {commentres && (
                <div>
                    {/* <h4>{issue.title}</h4> */}
                    <h3>Description</h3>
                    <p>{commentres.description}</p>
                </div>
            )}

            <div className="comment-box">
                <h3>Comments</h3>
                <textarea
                    rows="4"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleSubmitComment}>Submit Comment</button>
            </div>
            <div className="comment-list">
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment">
                                <p> {comment.body}</p>
                                <p>Commented by: {comment.user.login}</p>
                            </div>
                        ))}
                       
            </div>
        </div>
    );
}

export default OwnIssueDetails;
