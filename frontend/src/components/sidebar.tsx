import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import rootState from '../interfaces/rootState';
import { useEffect, useState } from 'react';


const Sidebar = () => {
  const role_id = useSelector((state : rootState) => state.userInformation.role_id);
  const port = process.env.REACT_APP_server_port;
  const [adminRoleID,setadminRole] = useState(0) ;
  useEffect(() => {
    const getRole = async () => {
        let role;
        try {
        role = await axios.get(`http://localhost:${port}/roleID`,
        {params : {
           role_name : "admin" 
        }})
      .then((response) => {
        setadminRole(response.data.roleID);
      });
      } catch (error) {
        console.log(error);
      }
      return role;
      };
    getRole();
  },[]);
  return (
    <ul>
        <li>
            <Link to="/home">Home</Link>
        </li>
        {role_id === adminRoleID &&
        <div>
          <li>
            <Link to="/manage-employees">Manage Employees</Link>
        </li>
        <li>
            <Link to="/branches">Branches</Link>
        </li>   
        </div>
        }
        <li>
            <Link to="/profile">Profile</Link>
        </li>
        <li>
            <Link to="/">Logout</Link>
        </li>
    </ul>
  )
}

export default Sidebar;