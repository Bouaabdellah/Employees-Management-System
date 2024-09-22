import axios from "axios";
import { useEffect, useState } from "react"
import workInfo from "../../interfaces/workInfo";
import employee from "../../interfaces/employee";
import branch from "../../interfaces/branch";
import role from "../../interfaces/role";
import { inputFormat } from "../../utils/date";
import { validateStartDate } from "../../config/validation";
import port from "../../utils/port";
import { useSelector } from "react-redux";
import rootState from "../../interfaces/rootState";

function EditWorkInfo({employee} : {employee : employee}){
  const startDate = inputFormat(employee.start_day);
  const [edit,setEdit] = useState<boolean>(false);
  const [workInfo,setWorkInfo] = useState<workInfo>({
    id : employee.id,
    branchID : employee.branch_id,
    roleID : employee.role_id,
    mgrID : employee.super_id,
    salary : employee.salary,
    startDate : startDate,
    is_manager : employee.is_manager
  });
  const [validate,setValidate] = useState({
    startDate : true,
    salary : true
  });
  const {managers,branches,roles} = useSelector((state : rootState) => state.choises);
   const validateData = () : boolean => {
   const validateSalary : boolean = workInfo.salary > 0;
   const validateStartDay : boolean = validateStartDate(workInfo.startDate);
   setValidate({...validate,
    salary : validateSalary,
    startDate : validateStartDay
   });
   const thereIsChange = (employee.salary !== workInfo.salary || employee.branch_id !== workInfo.branchID
    || employee.role_id !== workInfo.roleID || employee.super_id !== workInfo.mgrID ||
    employee.start_day !== workInfo.startDate || employee.is_manager !== workInfo.is_manager);
   return validateSalary && validateStartDay && thereIsChange;
   }
   const sendData = async () => {
   try {
   if (validateData()){
    axios.put(`http://localhost:${port}/employees/update`,{
    id : workInfo.id,
    branchID : workInfo.branchID,
    roleID : workInfo.roleID,
    mgrID : workInfo.mgrID ? workInfo.mgrID : null,
    startDate : workInfo.startDate,
    salary : workInfo.salary,
    is_manager : workInfo.is_manager
   });
   setEdit(false);
   } 
   } catch (error) {
    console.log(error);
    setEdit(false);
   }
   }
  const deleteEmployee = async () => {
  try {
  axios.delete(`http://localhost:${port}/employees/delete`,{
    data : {
    empID : workInfo.id    
    }
  }); 
  } catch (error) {
    console.log(error);
  }
  }
  return (
    <div className="mt-8">
    <div className="flex justify-between mb-8">
        <button className="capitalize py-2 px-4 bg-gray-300 rounded-md duration-300 hover:bg-gray-400"
        onClick={(e) => setEdit(true)}>
        edit work information
        </button>
        <button className="capitalize py-2 px-4 text-white rounded-md
        bg-red-600 duration-300 hover:bg-red-700" onClick={(e) => deleteEmployee()}>
        delete employee
        </button>
    </div>
    {edit &&
    <div className="pl-2">
    <table>
    <colgroup>
        <col span={1} className="w-[110px]"/>
        <col span={1} className="w-[120px]"/>
    </colgroup>
    <tbody>
    <tr>
    <td className="py-2">
    <label htmlFor="branch" 
    className={`text-[18px] mr-4`}>branch</label>
    </td>
    <td className="py-2">
    <select id="branch" className="bg-gray-200 py-2 px-4 rounded-md"
    onChange={(e) => setWorkInfo({...workInfo,branchID : +e.target.value})}>
    {branches.map((ele : branch) => {
    return(
    <option value={ele.branch_id} key={ele.branch_id} selected={ele.branch_id === employee.branch_id}>
    {ele.branch_name}
    </option>    
    )
    })}
    </select>
    </td>
    </tr>
    <tr>
    <td className="py-2">
    <label htmlFor="role" 
    className={`text-[18px] mr-4`}>role</label>
    </td>
    <td className="py-2">
    <select id="role" className="bg-gray-200 py-2 px-4 rounded-md"
    onChange={(e) => setWorkInfo({...workInfo,roleID : +e.target.value})}>
    {roles.map((ele : role) => {
    return(
    <option value={ele.role_id} key={ele.role_id} selected={ele.role_id === employee.role_id}>
    {ele.role_name}
    </option>    
    )
    })}
    </select>
    </td>
    </tr>
    <tr>
    <td className="py-2">
    <label htmlFor="mgrID" 
    className={`text-[18px] mr-4`}>manager id</label>
    </td>
    <td className="py-2">
    <select id="mgrID" className="bg-gray-200 py-2 px-4 rounded-md"
    onChange={(e) => setWorkInfo({...workInfo,mgrID : +e.target.value})}>
    {managers.map((ele : {super_id : number}) => {
        return (
            <option value={ele.super_id} key={ele.super_id} selected={ele.super_id === employee.super_id}>
                {ele.super_id}
            </option>
        )
    })}
    <option value="0" selected={!employee.super_id}>none</option>
    </select>
    </td>
    </tr>
    <tr>
    <td className="py-2">
    <label htmlFor="startDate" 
    className={`text-[18px] mr-4 ${!validate.startDate && 'text-red-600'}`}>start date</label>
    </td>
    <td className="py-2">
    <input type="date" id="startDate" className="bg-gray-200 py-2 px-4 rounded-md"
    onChange={(e) => setWorkInfo({...workInfo,startDate : e.target.value})} defaultValue={startDate}/>
    </td>
    </tr>
    <tr>
    <td className="py-2">
    <label htmlFor="salary" 
    className={`text-[18px] mr-4 ${!validate.salary && 'text-red-600'}`}>salary</label>
    </td>
    <td className="py-2">
    <input type="number" id="salary" className="bg-gray-200 py-2 px-4 rounded-md" 
    placeholder="algerian dinar AD" onChange={(e) => setWorkInfo({...workInfo,salary : +e.target.value})}
    defaultValue={employee.salary}/>
    </td>
    </tr>
    <tr className="py-2">
      <td>
        <label htmlFor="is_manager" className={`text-[18px] mr-4`}>is manager</label>
      </td>
      <td>
        <input type="checkbox" id="is_manager" checked={workInfo.is_manager} 
        onChange={() => setWorkInfo({...workInfo,is_manager : !workInfo.is_manager})}/>
      </td>
    </tr>
    </tbody>
    </table>
    <div className="flex gap-8 mt-6">
        <button className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white 
        duration-300 hover:bg-green-800" onClick={() => sendData()}>
            save
        </button>
        <button onClick={() => setEdit(false)} className="py-2 px-4 capitalize bg-gray-300 rounded-md
        duration-300 hover:bg-gray-400">
            cancel
        </button>
    </div>
    </div>}
    </div>
  )
}

export default EditWorkInfo;