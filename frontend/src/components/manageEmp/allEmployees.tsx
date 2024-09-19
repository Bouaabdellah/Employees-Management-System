import { useEffect, useState } from "react";
import employee from "../../interfaces/employee";
import Employees from "./employees";
import axios from "axios";

function AllEmployees() {
  const port = process.env.REACT_APP_server_port;
  const [employees,setEmployees] = useState<employee[]>([]);
  const [display,setDisplay] = useState<boolean>(false);
  const getEmployees = async () => {
  try {
  const response = await axios.get(`http://localhost:${port}/employees/get_all`);
  setEmployees(response.data.employees);   
  } catch (error) {
  console.log(error);    
  }
  }
  useEffect(() => {
    getEmployees();
  },[]);

  return (
    <div>
    <div className="mb-8">
    <button className="py-2 px-4 capitalize bg-green-700 mr-6 
    rounded-md text-white duration-300 hover:bg-green-800" onClick={(e) => setDisplay(true)}>
    get all employees
    </button>
    </div>
    {display &&
    <div>
    {!employees.length ? 
    <div className="text-xl py-2 px-3 bg-red-200 rounded-md text-red-600">
    There is no employee
    </div> : 
    <Employees employees={employees}/>}
    <div className="flex justify-center mt-6">
    <button onClick={(e) => setDisplay(false)} className="py-2 px-4 capitalize bg-gray-300 rounded-md
    duration-300 hover:bg-gray-400">
    cancel
    </button>
    </div>
    </div>
    }
    </div>
  )
}

export default AllEmployees;