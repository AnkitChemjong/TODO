import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

const Form = (props) => {
  const [file,setFile]=useState();
  const [data, setData] = useState({
    title: "",
    content: "",
    userName:'',
    email:'',
    password:''
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFile(files[0]);
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(props.type==='signin'){
      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      }
      formData.append('userName', data.userName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('title', data.title);
      formData.append('content', data.content);
      props.fun(e, formData);
    }
    else{
      props.fun(e,data);
    }
  };
  return (
    <div>
      <form
        className="max-w-lg mx-auto p-5 border border-gray-300 rounded-lg mt-20 border-4 border-emerald-500 "
        onSubmit={handleSubmit}
      >
        {props.type === "add" ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={props.func}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancel
            </button>
          </div>
        ) : null}
        {props.type === "add" && (
          <>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Content"
                required
                autoComplete="off"
              />
            </div>
          </>
        )}
        {props.type === "signin" && (
          <>
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              userName
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="userName"
              required
              autoComplete="username"
            />
          </div>
           <div className="mb-5">
           <label
             htmlFor="image"
             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
           >
             image
           </label>
           <input
             type="file"
             id="image"
             name='image'
             onChange={handleChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="file"
             required autoComplete="off"
           />
         </div>
         </>
        )}
        {(props.type === "signin" || props.type === "login") && 
        (
            <>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="password"
                  required
                  autoComplete='current-password'
                />
              </div>
            </>
          )}
          {props.type==='login' && (
            <div className="mt-10">
              <Link to='/email'>Forget Password</Link>
            </div>
          )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {props.type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
