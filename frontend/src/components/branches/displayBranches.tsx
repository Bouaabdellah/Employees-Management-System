import branch from "../../interfaces/branch";
import { NavLink } from "react-router-dom";

function DisplayBranches({branches} : {branches : branch[]}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3"> 
    {branches.map((ele : branch) => {
        return (
        <NavLink to={'/branch_info'} state={ele}
        className="bg-custom-gradient py-3 pl-3 text-white rounded-md 
        cursor-pointer duration-300 hover:text-green-300 capitalize"
        key={ele.branch_id}>
        <span>{ele.branch_name}</span>
        </NavLink>
        )
    })}
    </div>
  )
}

export default DisplayBranches;