import React, { useState } from 'react';
import { validateEmail,validatePWD } from '../config/validation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail as setStoreEmail,setRole_id } from '../stores/userInfo';

const Login = () => {
  axios.defaults.withCredentials = true;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [values,setValues] = useState({
    email : '',
    pwd : '',
    terms : false
   });
   const [invalid,setInvalid] = useState(false);
   const setEmail = (eve : React.ChangeEvent<HTMLInputElement>) => {
   setValues({...values,email : eve.target.value});
   };
   const setpwd = (eve : React.ChangeEvent<HTMLInputElement>) => {
   setValues({...values,pwd : eve.target.value});
   };
   const setTerms = () => {
    setValues({...values,terms : !values.terms});
   }

   // handle submits 
   const fetchLogin = async (email : string, pwd : string) => {
    try {
    const port = process.env.REACT_APP_server_port;
    await axios.post(`http://localhost:${port}/auth/login`,{
      email : email,
      password : pwd
    }).then((response) => {
    setInvalid(false);
    dispatch(setStoreEmail(response.data.email));
    dispatch(setRole_id(response.data.role_id));
    navigate('/');
    });
    } catch (error) {
      setInvalid(true);
    }
  }
   const handleSubmit = async (eve : React.FormEvent<HTMLFormElement>) => {
   eve.preventDefault();
   // validation
   if (values.terms){
    // confirm that email and pwd not empty
    if (!values.email.length || !values.pwd.length)
      setInvalid(true);
    else{
      const validEmail = validateEmail(values.email);
      const validPWD = validatePWD(values.pwd);
      if (!validEmail || !validPWD)
      setInvalid(true);
      else
      await fetchLogin(values.email,values.pwd);
   }
   }};

  return (
    <div className='flex justify-center items-center h-screen bg-loginPage bg-center bg-cover'>
        <div className='px-4 py-6 bg-gray-200 rounded-lg'>
         {invalid && <div className="py-2 px-3 bg-red-200 rounded-md text-red-600 mb-4">invalid login, try again</div>}
         <form action="" onSubmit={handleSubmit}>
            <div className='mb-4 flex flex-col gap-1'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input type="text" placeholder='enter email' id='email'
                className='py-2 px-3 rounded-md' onChange={setEmail}/>
            </div>
            <div className='mb-4 flex flex-col gap-1'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input type="password" placeholder='enter password' id='password'
                className='py-2 px-3 rounded-md' onChange={setpwd}/>
            </div>
            <div className='mt-2 mb-3 text-sm flex gap-2'>
                <input type="checkbox" id='terms' onChange={setTerms}/>
                <label htmlFor="terms">you are agree with terms & conditions</label>
            </div>
            <input type="submit" value="Sign in" 
            className='text-center py-2 text-white font-semibold bg-green-700 block w-full rounded-md'/>
        </form>   
        </div>  
    </div>
  )
};

export default Login;

// interface data{
//   loginStatus : boolean;
//   message : string;
//   accessToken : string;
// }