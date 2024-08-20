import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom';

const PassUp = () => {
    const navigate=useNavigate();
    
    const location=useLocation();
    const {email}=location.state||{};
    const [password,setPassword]=useState();
    const handleChange=(e) => {
        setPassword(e.target.value);
    };
    const go=async (e)=>{
        e.preventDefault();
        await axios.patch(`http://localhost:8080/user/pass/${email}`,{password}).then(()=>{  
           console.log("Success");
           alert("Login with new password")
           navigate('/login');
        }).catch(()=>{console.log("Failed");});
  };
  return (
    <>
      <div className='w-full h-full flex justify-center align-center'>
        <form  className="max-w-lg mx-auto p-5 border border-gray-300 rounded-lg mt-20 border-4 border-emerald-500 "
         onSubmit={go}>

         <div className="">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 New Password
                </label>
                <input
                onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="password"
                  required
                  autoComplete='current-password'
                />
                 <button

            type="submit"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Click
          </button>
              </div>
        </form>
    </div> 
    </>
  )
}

export default PassUp
