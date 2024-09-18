import { useEffect, useState } from "react";
import employee from "../../interfaces/employee";
import axios from "axios";
import { NavLink } from "react-router-dom";

function SearchEmployees() {
  const port = process.env.REACT_APP_server_port;
  const [search,setSearch] = useState<boolean>(false);
  const [employees,setEmployees] = useState<employee[]>([]);
  const [info,setInfo] = useState({
    firstname : '',
    lastname : '',
    id : 0
  });
  const getEmployees = async () => {
  try {
    const response = await axios.get(`http://localhost:${port}/employees/get_employee`, {
        params: {
          id: info.id === 0 ? null : info.id,
          firstName : info.firstname,
          lastName : info.lastname
        },
      }).then((res) => {
      return res.data  
      });
    if (response.employees)
    setEmployees(response.employees); 
    else
    setEmployees([]);
  } catch (error) {
    console.log(error);
    setEmployees([]);
  }
  }
  useEffect(() => {
  getEmployees();
  },[info]);
  return (
    <div className="mb-6">
      <div className="mb-8">
      <button className="py-2 px-4 capitalize bg-green-700 mr-6 
        rounded-md text-white duration-300 hover:bg-green-800" onClick={(e) => setSearch(true)}>
          search employee
        </button>
      </div>
      {search &&
      <div>
      <div className="flex flex-wrap gap-6 mb-6">
      <input type="text" placeholder="firstname..." className="bg-gray-200 py-2 px-4 rounded-md"
      onChange={(e) => setInfo({...info, firstname : e.target.value})}/>
      <input type="text" placeholder="lastname..." className="bg-gray-200 py-2 px-4 rounded-md"
      onChange={(e) => setInfo({...info, lastname : e.target.value})}/>
      <input type="number" placeholder="id..." className="bg-gray-200 py-2 px-4 rounded-md"
      onChange={(e) => setInfo({...info, id : +e.target.value})}/>
      </div>
      {!employees.length ? 
      <div className="text-xl py-2 px-3 bg-red-200 rounded-md text-red-600">
        There is no employee
      </div> : 
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
      {employees.map((ele : employee) => {
        return (
          <NavLink to={'/employee_profile'} state={ele}
          className="flex gap-2 bg-custom-gradient py-2 pl-2 text-white rounded-md 
          cursor-pointer duration-300 hover:text-green-300 capitalize"
          key={ele.id}>
            <span>{ele.id}</span>
            <span>{ele.firstname} {ele.lastname}</span>
          </NavLink>
        )
      })}
      </div>}
      <div className="flex justify-center mt-6">
      <button onClick={(e) => {
       setSearch(false);
       setEmployees([]); 
      }} className="py-2 px-4 capitalize bg-gray-300 rounded-md
        duration-300 hover:bg-gray-400">
          cancel
      </button>
      </div>
      </div>}
    </div>
  )
}

export default SearchEmployees;