import React from 'react';
import {useSelector} from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import Loader from '../components/Loader';

const HomeScreen = () => {

    const {loading, isAuthenticated} = useSelector(state=>state.user);

    
    return (
        <> {loading ? <Loader /> : isAuthenticated ? <Redirect to="/topic" /> : (
            <section className="landing">
                <div className="dark-overlay"></div>
                    <div className="landing-inner">
                        <h1>Welcome To Codeget</h1>
                        <p>Pracitce Interview Question of Many Programming Languages</p>
                        <div className="button">
                            <Link className="btn btn-primary mx-3" to="/login">Login</Link>
                            <Link className="btn btn-light" to="/register">Register</Link>
                        </div>
                    </div>
            </section>
        ) }
            
        </>
    )
}

export default HomeScreen;
