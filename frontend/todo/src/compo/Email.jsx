import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Email = () => {
    const navigate=useNavigate();
    const [email,setEmail]=useState();
    const handleChange=(e) => {
        setEmail(e.target.value);
    };
    const pass=async (e)=>{
        e.preventDefault();
          await axios.post('http://localhost:8080/user/pass/email',{email}).then((response)=>{  
             const emails=response.data.message
             navigate('/token',{state:{email}});
          }).catch(()=>{console.log("Failed");});
    };
  return (
    <div className='w-full h-full flex justify-center align-center'>
        <form  className="max-w-lg mx-auto p-5 border border-gray-300 rounded-lg mt-20 border-4 border-emerald-500 "
         onSubmit={pass}>

         <div className="">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Email
                </label>
                <input
                onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email"
                  required
                  autoComplete='current-email'
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
  )
}

export default Email
