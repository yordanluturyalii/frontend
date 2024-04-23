import React from 'react'
import { redirect } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    const handleClickLogout = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/logout', {
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data);
    }

  return (
    <>
        <Navbar name={name} onClick={handleClickLogout}/>
    </>
  )
}

export default Home