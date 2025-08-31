import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {

    if(localStorage.getItem("useToken")){
     // go component
     return props.children
    }else{
      //go login
      return <Navigate to="./login"/>
    }


}
