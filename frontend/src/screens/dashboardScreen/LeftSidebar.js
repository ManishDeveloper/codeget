import React from 'react';
import {Link} from "react-router-dom";

const LeftSidebar = ({currentPage}) => {
    return (
        <>
            <div className="question-list-sidebar">
                <div className="exercise-count">
                    <h5>Dashboard Panel</h5>
                </div>
                <div className="exercise-list">
                    <ul>
                    <li className={`${currentPage === "home" && "active"}`}><Link to="/dashboard/home">All Questions</Link></li>
                    <li className={`${currentPage === "add" && "active"}`} ><Link to="/dashboard/add">Add Questions</Link></li>
                    <li><Link to="/dashboard/home">All Categories</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default LeftSidebar;
