import React,{useContext} from 'react';
import Form from './Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AppContext from './context.jsx';


const Signin =() => {
  const {flag,setFlag}=useContext(AppContext);
  const navigate=useNavigate();
  const signIn=async (e,data)=>{
     await axios.post('http://localhost:8080/user/',data,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }).then(()=>{
        setFlag(flag+1)
        alert("User signed in successfully");
       navigate('/login');
      }).catch((err)=>{
        console.log(err);
      })
  };
  return (
    <div>
      <Form fun={signIn} type='signin'/>
    </div>
  )
}

export default Signin;
