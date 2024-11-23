import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import rootState from '../../interfaces/rootState';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { FaCodeBranch } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { setSidebar } from '../../stores/sidebar';
import Logout from '../logout';
import host from '../../utils/host';

const Sidebar = () => {
  const role_id = useSelector(
    (state: rootState) => state.userInformation.role_id,
  );
  const [adminRoleID, setadminRole] = useState(0);
  const [logout, setLogout] = useState<boolean>(false);
  useEffect(() => {
    const getRole = async () => {
      try {
        await axios
          .get(`${host}/role/roleID`, {
            params: {
              role_name: 'admin',
            },
          })
          .then((response) => {
            setadminRole(response.data.roleID);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getRole();
  }, []);
  const displaySidebar = useSelector(
    (state: rootState) => state.sidebar.displaySidebar,
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div
        className={`fixed top-0 ${
          displaySidebar ? 'left-0' : '-left-full'
        } duration-300
    w-full h-full z-10 bg-gray-400 opacity-30`}
      ></div>
      <div
        className={`bg-custom-gradient text-white h-full w-full md:w-1/4 py-4 md:rounded-r-xl
      fixed z-20 top-0 ${
        displaySidebar ? 'left-0' : '-left-full'
      } duration-300`}
      >
        <div className="flex justify-between items-center text-xl font-semibold mb-6 px-4">
          <div>Sidebar</div>
          <div
            className="cursor-pointer p-1 duration-300 rounded-md hover:bg-[#494949]"
            onClick={() => dispatch(setSidebar())}
          >
            <IoMdClose />
          </div>
        </div>
        <ul className="flex flex-col">
          <li
            className="hover:bg-slate-600 py-0 px-4 rounded-md hover:text-green-300"
            onClick={() => dispatch(setSidebar())}
          >
            <NavLink to="/home" className="flex items-center gap-2 py-2">
              <IoHomeOutline />
              <span>Home</span>
            </NavLink>
          </li>
          {role_id === adminRoleID && (
            <li
              className="hover:bg-slate-600 py-0 px-4 rounded-md hover:text-green-300"
              onClick={() => dispatch(setSidebar())}
            >
              <NavLink
                to="/manage-employees"
                className="flex items-center gap-2 py-2"
              >
                <MdOutlineManageAccounts />
                <span>Manage Employees</span>
              </NavLink>
            </li>
          )}
          {role_id === adminRoleID && (
            <li
              className="hover:bg-slate-600 py-0 px-4 rounded-md hover:text-green-300"
              onClick={() => dispatch(setSidebar())}
            >
              <NavLink to="/branches" className="flex items-center gap-2 py-2">
                <FaCodeBranch />
                <span>Branches</span>
              </NavLink>
            </li>
          )}
          <li
            className="hover:bg-slate-600 py-0 px-4 rounded-md hover:text-green-300"
            onClick={() => dispatch(setSidebar())}
          >
            <NavLink to="/profile" className="flex items-center gap-2 py-2">
              <CgProfile />
              <span>Profile</span>
            </NavLink>
          </li>
          <li
            className="hover:bg-slate-600 py-0 px-4 rounded-md hover:text-green-300"
            onClick={() => setLogout(true)}
          >
            <div className="flex items-center gap-2 py-2">
              <MdLogout />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
      {logout && <Logout setLogout={setLogout} />}
    </div>
  );
};

export default Sidebar;
