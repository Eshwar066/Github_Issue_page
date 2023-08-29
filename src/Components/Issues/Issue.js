import React, { useEffect, useState } from 'react';
import './Issue.scss';
import axios from 'axios';
import { Link } from 'react-router-dom'
import NewIssue from '../NewIssue/NewIssue';


const Issue = () => {
    const [newData, setNewData] = useState([]);
    const [issueData, setIssueData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // const [isComponentOpen, setIsComponentOpen] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/rails/rails/issues?page=${currentPage}&per_page=25`);
                // https://api.github.com/search/issues/faccebook/
                // https://api.github.com/repos/rails/rails/issues?page=${currentPage}&per_page=25
                setIssueData(response.data);

               
                // setNewData(savedData)
                // console.log('newData eshwar'+ newData);


            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [currentPage]);

    useEffect(()=>{
        const savedData = localStorage.getItem("issueData");
        if (savedData) {
            setNewData(JSON.parse(savedData)); 
        }
    },[])

    const handlePageChange = (newPage) => {

        newPage > 0 && setCurrentPage(newPage);

    };

    const currentDate = new Date();

  

    return (
        <div className='main'>
            <div className='github'>
                <h1 className='name'>Github Issue Page</h1>
               
            </div>

            {/* ====================================================== */}
            <div>
                <Link to="/NewIssue" style={{ 'textDecoration': 'none' }}>
                    <button className='new-issue'> New Issue</button> 
                </Link>
                <div className='issues'>
                    {/* ==================================== */}
                    <ul className="list-container">

                        {newData.map((issue,index) => (
                            <li key={index}>
                                <div className="list">
                                    <div>
                                        <div className="title">
                                            <span className='icon'>⊙</span>
                                            <Link to={`/ownIssueDetails/${index}`}  >
                                                <a> {issue.title} </a>
                                            </Link>
                                        </div>
                                        <p className='date'>
                                        # {index+6000000}  opened on {currentDate.toLocaleDateString()} by
                                            <a > --User</a>
                                        </p>

                                    </div>
                                    <p className="comment">
                                        <span className='icon'>✉</span>
                                        {0} comments
                                    </p>

                                </div>
                            </li>
                            
                        ))}
                    </ul>



                    {/* ====================================== */}
                    <ul className="list-container">

                        {issueData.map((issue) => (
                            <li key={issue.id}>
                                <div className="list">
                                    <div>
                                        <div className="title">
                                            <span className='icon'>⊙</span>
                                            <Link to={`/issue/${issue.number}`} >
                                                <a href={issue.body} > {issue.title} </a>
                                            </Link>

                                        </div>
                                        <p className='date'>
                                            # {issue.number} opened on {issue.updated_at} by
                                            <a href={issue.user.html_url}> {issue.user.login}</a>
                                        </p>
                                    </div>
                                    <p className="comment">
                                        <span className='icon'>✉</span>
                                        {issue.comments} comments
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className='page'> 
            <div className='pagination'>
                    <button className='btn' onClick={() => handlePageChange(currentPage - 1)}> Previous </button>
                    <span> {currentPage} </span>
                    <button className='btn' onClick={() => handlePageChange(currentPage + 1)}> Next </button>
            </div>
            </div>


        </div>
    );
}

export default Issue;
