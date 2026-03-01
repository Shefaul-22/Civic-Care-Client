import React from 'react';
import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'https://civic-care-server-tau.vercel.app'
   
})

const UseAxios = () => {

    return axiosInstance;
};

export default UseAxios;