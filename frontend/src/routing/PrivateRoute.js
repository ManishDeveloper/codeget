import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {useSelector } from "react-redux";
import Loader from '../components/Loader';

const PrivateRoute = ({component:Component,...rest}) => {

    const {isAuthenticated,loading} = useSelector(state => state.user)
    return (
        <Route {...rest} render={props=>loading ? <Loader /> : isAuthenticated ? <Component {...props}/> : <Redirect to="/login" />} />
            
    )
}

export default PrivateRoute;
