import { useEffect, useRef, useState } from 'react';
import employee from '../../interfaces/employee';
import axios from 'axios';
import Employees from './employees';
import host from '../../utils/host';
import { useSelector } from 'react-redux';
import rootState from '../../interfaces/rootState';
import branch from '../../interfaces/branch';
import role from '../../interfaces/role';

function SearchEmployees() {
  const [search, setSearch] = useState<boolean>(false);
  const [employees, setEmployees] = useState<employee[]>([]);
  const { managers, branches, roles } = useSelector(
    (state: rootState) => state.choises,
  );
  const [info, setInfo] = useState({
    firstname: '',
    lastname: '',
    id: 0,
    branchID: 0,
    roleID: 0,
    mgrID: 0,
  });
  const getEmployees = async () => {
    try {
      const response = await axios
        .get(`${host}/employees/get_employee`, {
          params: {
            id: info.id === 0 ? null : info.id,
            firstName: info.firstname,
            lastName: info.lastname,
            branchID: info.branchID ? info.branchID : null,
            roleID: info.roleID ? info.roleID : null,
            mgrID: info.mgrID ? info.mgrID : null,
          },
        })
        .then((res) => {
          return res.data;
        });
      if (response.employees) setEmployees(response.employees);
      else setEmployees([]);
    } catch (error) {
      console.log(error);
      setEmployees([]);
    }
  };
  const isAmounted = useRef<boolean>(false);
  useEffect(() => {
    if (isAmounted.current && search) getEmployees();
    else isAmounted.current = true;
  }, [info]);

  return (
    <div className="mb-6">
      <div className="mb-8">
        <button
          className="py-2 px-4 capitalize bg-green-700 mr-6 
        rounded-md text-white duration-300 hover:bg-green-800"
          onClick={(e) => setSearch(true)}
        >
          search employee
        </button>
      </div>
      {search && (
        <div>
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstname">firstname</label>
              <input
                type="text"
                placeholder="firstname..."
                className="bg-gray-200 py-2 px-4 rounded-md"
                id="firstname"
                onChange={(e) =>
                  setInfo({ ...info, firstname: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastname">lastname</label>
              <input
                type="text"
                placeholder="lastname..."
                className="bg-gray-200 py-2 px-4 rounded-md"
                id="lastname"
                onChange={(e) => setInfo({ ...info, lastname: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="id">id</label>
              <input
                type="number"
                placeholder="id..."
                className="bg-gray-200 py-2 px-4 rounded-md"
                id="id"
                onChange={(e) => setInfo({ ...info, id: +e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="branch" className={`text-[18px] mr-4`}>
                branch
              </label>
              <select
                id="branch"
                className="bg-gray-200 py-2 px-4 rounded-md"
                onChange={(e) =>
                  setInfo({ ...info, branchID: +e.target.value })
                }
              >
                <option value="0">any branch</option>
                {branches.map((ele: branch) => {
                  return (
                    <option value={ele.branch_id} key={ele.branch_id}>
                      {ele.branch_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className={`text-[18px] mr-4`}>
                role
              </label>
              <select
                id="role"
                className="bg-gray-200 py-2 px-4 rounded-md"
                onChange={(e) => setInfo({ ...info, roleID: +e.target.value })}
              >
                <option value="0">any role</option>
                {roles.map((ele: role) => {
                  return (
                    <option value={ele.role_id} key={ele.role_id}>
                      {ele.role_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mgrID" className={`text-[18px] mr-4`}>
                manager id
              </label>
              <select
                id="mgrID"
                className="bg-gray-200 py-2 px-4 rounded-md"
                onChange={(e) => setInfo({ ...info, mgrID: +e.target.value })}
              >
                <option value="0">any manager</option>
                {managers.map((ele: { super_id: number }) => {
                  return (
                    <option value={ele.super_id} key={ele.super_id}>
                      {ele.super_id}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {!employees.length ? (
            <div className="text-xl py-2 px-3 bg-red-200 rounded-md text-red-600">
              There is no employee
            </div>
          ) : (
            <Employees employees={employees} />
          )}
          <div className="flex justify-center mt-8">
            <button
              onClick={(e) => {
                setSearch(false);
                setEmployees([]);
              }}
              className="py-2 px-4 capitalize bg-gray-300 rounded-md
        duration-300 hover:bg-gray-400"
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchEmployees;
