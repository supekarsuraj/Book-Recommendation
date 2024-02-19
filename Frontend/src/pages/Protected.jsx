import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogedIn = () => {
        const token = localStorage.getItem('token');
        if(token == null || !token){
          navigate('/signup')
        }
    }
    checkUserLogedIn()
  }, []);

  return (

    <div>
        <Component />
    </div>
  );
}

export default Protected;
