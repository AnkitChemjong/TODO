import axios from 'axios';
import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import AppContext from './context.jsx';

const Login= () => {
  const {flag,setFlag}=useContext(AppContext);
  const navigate=useNavigate(); 
  const logIn=async (e,data)=>{
   await axios.post('http://localhost:8080/user/log',data).then(()=>{
    setFlag(flag+1)
    alert("User loged in successfully");
    navigate('/');
      
   }).catch(()=>{});
  }
  return (
    <div>
      <Form type='login' fun={logIn}/>
    </div>
  )
}

export default Login;