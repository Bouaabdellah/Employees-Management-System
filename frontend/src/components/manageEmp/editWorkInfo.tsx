import axios from "axios";
import { useEffect, useState } from "react"
import workInfo from "../../interfaces/workInfo";
import employee from "../../interfaces/employee";
import branch, { branchInit } from "../../interfaces/branch";
import role, { roleInit } from "../../interfaces/role";
import { inputFormat } from "../../utils/date";
import { validateStartDate } from "../../config/validation";

function EditWorkInfo({employee} : {employee : employee}) {
  const port = process.env.REACT_APP_server_port;
  const startDate = inputFormat(employee.start_day);
  const [edit,setEdit] = useState<boolean>(false);
  const [workInfo,setWorkInfo] = useState<workInfo>({
    id : employee.id,
    branchID : employee.branch_id,
    roleID : employee.role_id,
    mgrID : employee.super_id,
    salary : employee.salary,
    startDate : startDate
  });
  const [validate,setValidate] = useState({
    startDate : true,
    salary : true
  });
  const [branches,setBranches] = useState<branch[]>([branchInit]);
  const [roles,setRoles] = useState<role[]>([roleInit]);
  const [managers,setManagers] = useState<{super_id : number}[]>([{super_id : 0}]);
  const fetchWorkChoises = async () => {
    try {
        let defaultBranch : number = 0,
        defaultRole : number = 0,
        defaultManager : number = 0;
        const branchResponse = await axios.get(`http://localhost:${port}/branch/get_all`);
        setBranches(branchResponse.data.branches);
        if (branchResponse.data.branches.length)
          defaultBranch = branchResponse.data.branches[0].branch_id;   
        const roleResponse = await axios.get(`http://localhost:${port}/role/roleList`);
        setRoles(roleResponse.data.rolesList);
        if (roleResponse.data.rolesList.length)
          defaultRole = roleResponse.data.rolesList[0].role_id;
        const managersResponse = await axios.get(`http://localhost:${port}/employees/get_managers`);
        setManagers(managersResponse.data.managers);
        if (managersResponse.data.managers.length)
          defaultManager = managersResponse.data.managers[0].super_id;
        setWorkInfo({...workInfo,branchID : defaultBranch,
            roleID : defaultRole, mgrID : defaultManager
        });
    } catch (error) {
        console.log(error);
    }
    }
   useEffect(() => {
    fetchWorkChoises();
   },[]);
   const validateData = () : boolean => {
   const validateSalary : boolean = workInfo.salary > 0;
   const validateStartDay : boolean = validateStartDate(workInfo.startDate);
   setValidate({...validate,
    salary : validateSalary,
    startDate : validateStartDay
   });
   const thereIsChange = (employee.salary !== workInfo.salary || employee.branch_id !== workInfo.branchID
    || employee.role_id !== workInfo.roleID || employee.super_id !== workInfo.mgrID ||
    employee.start_day !== workInfo.startDate);
   return validateSalary && validateStartDay && thereIsChange;
   }
   const sendData = async () => {
   try {
   if (validateData()){
    axios.put(`http://localhost:${port}/employees/update`,{
    id : workInfo.id,
    branchID : workInfo.branchID,
    roleID : workInfo.roleID,
    mgrID : workInfo.mgrID,
    startDate : workInfo.startDate,
    salary : workInfo.salary
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
        <col span={1} className="w-[100px]"/>
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
    onChange={(e) => setWorkInfo({...workInfo,branchID : +e.target.value})} defaultValue={employee.branch_id}>
    {branches.map((ele : branch) => {
    return(
    <option value={ele.branch_id} key={ele.branch_id}>
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
    onChange={(e) => setWorkInfo({...workInfo,roleID : +e.target.value})} defaultValue={employee.role_id}>
    {roles.map((ele : role) => {
    return(
    <option value={ele.role_id} key={ele.role_id}>
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
    onChange={(e) => setWorkInfo({...workInfo,mgrID : +e.target.value})} defaultValue={employee.super_id}>
    {managers.map((ele : {super_id : number}) => {
        return (
            <option value={ele.super_id} key={ele.super_id}>
                {ele.super_id}
            </option>
        )
    })}
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
    </tbody>
    </table>
    <div className="flex gap-8 mt-6">
        <button className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white 
        duration-300 hover:bg-green-800" onClick={(e) => sendData()}>
            save
        </button>
        <button onClick={(e) => setEdit(false)} className="py-2 px-4 capitalize bg-gray-300 rounded-md
        duration-300 hover:bg-gray-400">
            cancel
        </button>
    </div>
    </div>}
    </div>
  )
}

export default EditWorkInfo;