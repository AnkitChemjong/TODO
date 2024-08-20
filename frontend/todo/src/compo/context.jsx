import axios from "axios";
import React,{ createContext, useEffect, useState } from "react";

const AppContext=createContext();

export const ContextApp = ({children}) => {
    const [user,setUser]=useState(null);
    const [flag,setFlag]=useState(0);
    useEffect(()=>{
        const getLogedUser=async ()=>{
           await axios.get('http://localhost:8080/him').then((response)=>{
                setUser(response.data.user);
                console.log(response);
            }).catch((error)=>{console.log(error)});
        }
        getLogedUser();
    },[flag]);
  return (
    <AppContext.Provider value={{user,setUser,flag,setFlag}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;
