import employee from "../../interfaces/employee";
import { NavLink } from "react-router-dom";

function Employees({employees} : {employees : employee[]}) {
  return (
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
      </div>
  )
}

export default Employees;