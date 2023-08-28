import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import './IssueDetails.css';

const IssueDetails = () => {
    const { issueNumber } = useParams();
    const [issueDetails, setIssueDetails] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
    const[issueCommentDetials,setIssueCommentDetails]=useState('');
    

    useEffect(() => {
        const fetchIssueDetails = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/rails/rails/issues/${issueNumber}`);
                const responseComment = await axios.get(`https://api.github.com/repos/rails/rails/issues/${issueNumber}/comments`);
                setIssueDetails(response.data);
                setIssueCommentDetails(responseComment.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchIssueDetails();
    }, [issueNumber]);





    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment.trim() !== '') {
            setComments([...comments, { id: comments.length + 1, body: comment, user: { login: 'You' } }]);
            setComment('');
           
        }
       
    };

    return (
        <div>
            {issueDetails ? (
                <div className='issueDetails'>
                    <h2>Issue Details</h2>
                    <h3>{issueDetails.title}</h3>
                    <p>login: {issueDetails.user.login}</p>
                    <p>Issue Number: #{issueDetails.number}</p>
                    <p>Status: {issueDetails.state}</p>
                    <p>Created At: {issueDetails.created_at}</p>
                    <p>Updated At: {issueDetails.updated_at}</p>

                    <div className="markdown-container">
                        <ReactMarkdown>{issueDetails.body}</ReactMarkdown>
                    </div>

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
                        {
                           issueCommentDetials.map((item)=>(
                            <div key={item.id} className='comment'>
                                <p>{item.body}</p>
                                <p>Commented by: {item.user.login}</p>
                            </div>
                           )) 

                        }
                    </div>
                </div>
            ) : (
                <p>Loading issue details...</p>
            )}
        </div>
    );
}

export default IssueDetails;
