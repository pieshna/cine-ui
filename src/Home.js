import React from 'react'
import { Navigate } from 'react-router-dom' 

export default function Home() {
    if(sessionStorage.getItem('id')){
        return <Navigate to="/movie/list" />
    }else{
        return <Navigate to="/login" />
    }

}
