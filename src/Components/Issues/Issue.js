import React, { useEffect, useState } from 'react';
import './Issue.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom'


const Issue = () => {
    const [issueData, setIssueData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/rails/rails/issues?page=${currentPage}&per_page=25`);
                // https://api.github.com/search/issues/faccebook/
                //https://api.github.com/repos/rails/rails/issues?page=${currentPage}&per_page=25
                setIssueData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (newPage) => {

        newPage > 0 && setCurrentPage(newPage);

    };

    return (
        <div className='main'>
            <div className='github'>
                <h1 className='name'>Github Issue Page</h1>
                <div className='pagination'>
                    <button className='btn' onClick={() => handlePageChange(currentPage - 1)}> Previous </button>
                    <span> {currentPage} </span>
                    <button  className='btn' onClick={() => handlePageChange(currentPage + 1)}> Next </button>
                </div>
            </div>

            <div id='issueBody'>
                <div className='Issue'>
                    {issueData.map(post => (
                        <div key={post.id} className='header'>
                            <Link to={`/issue/${post.number}`} className='title-link'>
                                <span className='isOpen'>
                                    {post.state === 'open' ? (<FontAwesomeIcon icon={faCheckCircle} />) : (<FontAwesomeIcon icon={faTimesCircle} />)}
                                </span>
                                <h4 className='title'>{post.title}</h4>
                            </Link>
                            <p>login: {post.user.login}</p>
                            <p># {post.number}</p>
                        </div>
                    ))}
                </div>
            </div>
           

        </div>
    );
}

export default Issue;
