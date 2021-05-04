import React from 'react'
import { AuthProvider } from '../context/AuthProvider';
import  Routess from './Routess';

const Providers = () => {
    return(
        <AuthProvider>
            <Routess />
        </AuthProvider>
    )
}

export default Providers;