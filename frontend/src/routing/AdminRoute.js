import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {useSelector } from "react-redux";
import Loader from '../components/Loader';

const AdminRoute = ({component:Component,...rest}) => {

    const {isAuthenticated,loading,userInfo} = useSelector(state => state.user)
    return (
        <Route {...rest} render={props=>loading ? <Loader /> : 
        isAuthenticated ? (userInfo.isAdmin ? <Component {...props}/> : <Redirect to="/topic" />) : <Redirect to="/login" />} />
            
    )
}

export default AdminRoute;
