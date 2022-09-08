import React from 'react'
import { Navigate } from 'react-router-dom' 

export default function Home() {
    if(sessionStorage.getItem('id')){
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }else{
        return <Navigate to="/login" />
    }

}
