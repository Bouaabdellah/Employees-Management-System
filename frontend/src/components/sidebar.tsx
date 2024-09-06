import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import rootState from '../interfaces/rootState';
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { setSidebar } from '../stores/sidebar';


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
  const displaySidebar = useSelector((state : rootState) => state.sidebar.displaySidebar);
  const dispatch = useDispatch();

  return (
    <div>
    <div className={`absolute top-0 ${displaySidebar ? 'left-0' : '-left-full'} duration-300
    w-full h-full z-10 bg-gray-50`}>
    </div>
    <div className={`bg-custom-gradient text-white h-full w-full md:w-1/4 p-4 md:rounded-r-xl
      fixed z-20 top-0 ${displaySidebar ? 'left-0' : '-left-full'} duration-300`}>
      <div className='flex justify-between items-center text-xl font-semibold mb-6'>
        <div>
          Sidebar
        </div>
        <div className='cursor-pointer' onClick={() => dispatch(setSidebar())}>
        <IoMdClose />
        </div>
      </div>
      <ul className='flex flex-col gap-4'>
        <li>
          <NavLink to="/home" className='flex items-center gap-2'>
          <IoHomeOutline />
          <span>Home</span>
          </NavLink>
        </li>
        {role_id === adminRoleID &&
        <li>
          <NavLink to="/manage-employees" className='flex items-center gap-2'>
          <MdOutlineManageAccounts />
          <span>Manage Employees</span>
          </NavLink>
        </li>
        }
        {role_id === adminRoleID &&
        <li>
          <NavLink to="/branches" className='flex items-center gap-2'>
          <FaCodeBranch />
          <span>Branches</span>
          </NavLink>
        </li>   
        }
        <li>
          <NavLink to="/profile" className='flex items-center gap-2'>
          <CgProfile />
          <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className='flex items-center gap-2'>
          <MdLogout />
          <span>Logout</span>
          </NavLink>
        </li>
    </ul> 
    </div>
    </div>
    
  )
}

export default Sidebar;