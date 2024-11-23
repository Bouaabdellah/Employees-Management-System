import React, { useState } from 'react';
import { validateEmail, validatePWD } from '../config/validation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setusername, setRole_id, setID } from '../stores/userInfo';
import host from '../utils/host';
import { setBranches, setManagers, setRoles } from '../stores/choises';

const Login = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    pwd: '',
    terms: false,
  });
  const [invalid, setInvalid] = useState(false);
  const setEmail = (eve: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: eve.target.value });
  };
  const setpwd = (eve: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, pwd: eve.target.value });
  };
  const setTerms = () => {
    setValues({ ...values, terms: !values.terms });
  };
  // fetch managers
  const getChoises = async () => {
    try {
      const managersResponse = await axios.get(
        `${host}/employees/get_managers`,
      );
      dispatch(setManagers(managersResponse.data.managers));
      const roleResponse = await axios.get(`${host}/role/roleList`);
      dispatch(setRoles(roleResponse.data.rolesList));
      const branchResponse = await axios.get(`${host}/branch/get_all`);
      dispatch(setBranches(branchResponse.data.branches));
    } catch (error) {
      console.log(error);
    }
  };
  // handle submits
  const fetchLogin = async (email: string, pwd: string) => {
    try {
      await axios
        .post(`${host}/auth/login`, {
          email: email,
          password: pwd,
        })
        .then((response) => {
          setInvalid(false);
          // set user info store
          dispatch(
            setusername(`${response.data.firstname} ${response.data.lastname}`),
          );
          dispatch(setRole_id(response.data.role_id));
          dispatch(setID(response.data.id));
          navigate('/home');
        });
      await getChoises();
    } catch (error) {
      setInvalid(true);
    }
  };
  const handleSubmit = async (eve: React.FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
    // validation
    if (values.terms) {
      // confirm that email and pwd not empty
      if (!values.email.length || !values.pwd.length) setInvalid(true);
      else {
        const validEmail = validateEmail(values.email);
        const validPWD = validatePWD(values.pwd);
        if (!validEmail || !validPWD) setInvalid(true);
        else await fetchLogin(values.email, values.pwd);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-loginPage bg-center bg-cover">
      <div className="px-4 py-6 bg-gray-200 rounded-lg">
        {invalid && (
          <div className="py-2 px-3 bg-red-200 rounded-md text-red-600 mb-4">
            invalid login, try again
          </div>
        )}
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              placeholder="enter email"
              id="email"
              className="py-2 px-3 rounded-md"
              onChange={setEmail}
            />
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="enter password"
              id="password"
              className="py-2 px-3 rounded-md"
              onChange={setpwd}
            />
          </div>
          <div className="mt-2 mb-3 text-sm flex gap-2">
            <input type="checkbox" id="terms" onChange={setTerms} />
            <label htmlFor="terms">you are agree with terms & conditions</label>
          </div>
          <input
            type="submit"
            value="Sign in"
            className="text-center py-2 text-white font-semibold bg-green-700 block w-full rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
