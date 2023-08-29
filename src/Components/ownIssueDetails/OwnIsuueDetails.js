import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OwnIssueDetails.scss";

const OwnIssueDetails = () => {
    const { id } = useParams();
    const [newData, setNewData] = useState([]);
    const [issue, setIssue] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem("issueData");
        if (savedData) {
            setNewData(JSON.parse(savedData));
        }

        const selectedIssue = newData.find(item => item.id === id);
        setIssue(selectedIssue);
    }, [id, newData]);

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
            {issue &&(
            <div>
            <h2>{issue.title}</h2>
                        <p>login: you</p>
                        <p>Issue Number: #{issue.id}</p>
                        <p>Status: open</p>
                        {/* <p>Created At: {new Date()}</p>
                        <p>Updated At: {new Date()}</p> */}
                        
                        </div>)

            }    
            </div>            


            {issue && (
                <div>
                    {/* <h4>{issue.title}</h4> */}
                    <h3>Description</h3>
                    <p>{issue.description}</p>
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
