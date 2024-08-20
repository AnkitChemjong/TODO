import React, { useEffect, useState,useContext } from "react";
import Form from "./Form.jsx";
import axios from "axios";
import AppContext from './context.jsx';

const Home = () => {
  const {user,flag,setFlag}=useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const [togg, setTogg] = useState(false);
  const [note, setNote] = useState([]);
  const [temp,setTemp]=useState(null);
  
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:8080/")
        .then((response) => {
          //console.log(response.data);
          setNote(response.data);
        })
        .catch((err) => {
          window.alert(err);
        });
    };
    getData();
  }, [flag]);
  const toggleFunction = () => {
    setToggle(!toggle);
  };
  const toggleFunction2 = (data) => {
    console.log(data);
    setTogg(!togg);
    setTemp(data);
  };
  const sendData = async (e, data) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/", data)
      .then((response) => {
        setFlag(flag + 1);
        setToggle(!toggle);
        window.alert("OK data Posted");
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  const deleteData = async (e, data) => {
    e.preventDefault();
    await axios
      .delete("http://localhost:8080/", {data:{data:data}})
      .then((response) => {
        setFlag(flag + 1);
        window.alert("Note Deleted");
      })
      .catch((err) => {
        window.alert(err);
      });}
  const updateData = async (e, data) => {
        e.preventDefault();
        await axios
          .patch(`http://localhost:8080/${temp}`, data)
          .then((response) => {
            setFlag(flag + 1);
            setTogg(!togg)
            window.alert("Note Updated");
          })
          .catch((err) => {
            window.alert(err);
          });}
  return (
    <div className='bg-fuchsia-300 items-center justify-center max-h-full mt-0'>
      {user===null? (
          <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 underline">TODO APP</h1>
             <h1>User is not logged out</h1>
          </div>
        </div>
      ):
      (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 underline">TODO APP</h1>
          <button
            onClick={toggleFunction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Todo
          </button>
        </div>
      </div>
      )
      }

      {toggle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg mx-auto">
            <Form type="add" func={toggleFunction} fun={sendData} />
          </div>
        </div>
      )}
        {togg && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg mx-auto">
            <Form type="add" func={toggleFunction2} fun={updateData} />
          </div>
        </div>
      )}
  <div className=" grid-container flex flex-wrap mt-10 justify-center align-center">
  {note.map((maps, index) => {
    return (
      <div 
        className="max-w-lg rounded-3xl overflow-hidden shadow-lg ml-10 mb-10 p-5
        bg-red-300 border-2 border-sky-500 "
        key={maps.Noteid}
        style={{ flex: '0 0 calc(50% - 20px)' }}
      >
        <div className="px-6 py-4 flex-wrap">
          <div className="font-bold text-xl mb-2 text-center">{maps.title}</div>
          <div className='grid justify-center align-center p-10 '>
          <p className="text-gray-700 text-base text-center">
            {maps.content}
           </p>
          </div>
        </div>
        <div className='flex'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 mt-10" 
      onClick={(e)=>deleteData(e,maps.Noteid)}>
        Delete
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-60 mt-10" onClick={()=>toggleFunction2(maps.Noteid)}>
        Edit
      </button>
      </div>
      </div>
    );
  })}
</div>
  </div>
  );
};

export default Home;
