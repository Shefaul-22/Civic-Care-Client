import React from 'react';
import UseAuth from '../hooks/UseAuth';
import Loading from '../components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = UseAuth();

    const location = useLocation();
    // console.log('location', location);

    

    if(loading){
        return <Loading></Loading>
    }

    if(!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }



    return children;
};

export default PrivateRoute;