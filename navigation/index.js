import React from 'react'
import { AuthProvider } from '../context/AuthProvider';
import { Routes } from './Routess';

const Providers = () => {
    return(
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default Providers;