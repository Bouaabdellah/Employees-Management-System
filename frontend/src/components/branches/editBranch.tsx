import { useEffect, useState } from "react";
import branch from "../../interfaces/branch";
import axios from "axios";
import { inputFormat } from "../../utils/date";
import { validateNames, validateStartDate } from "../../config/validation";

function EditBranch({branchInfo} : {branchInfo : branch}) {
  const port = process.env.REACT_APP_server_port;
  const [info,setInfo] = useState<branch>(branchInfo);
  const [edit,setEdit] = useState<boolean>(false);
  const [managers,setManagers] = useState<{super_id : number}[]>([]);
  const [validation,setValidation] = useState<{name : boolean; launchDate : boolean}>({
    name : true,
    launchDate : true
  });
  const startDate = inputFormat(branchInfo.start_day);
  // fetch managers
  const getManagers = async () => {
    try {
    const managersResponse = await axios.get(`http://localhost:${port}/employees/get_managers`);
    setInfo({...info,mgr_id : managersResponse.data.managers[0].super_id});
    setManagers(managersResponse.data.managers);
    } catch (error) {
      console.log(error);
      setManagers([]);  
    }
  }
  // validate before send data
  const validateInfo = () => {
  const validateName : boolean = validateNames(info.branch_name);
  const validateLaunchDate : boolean = validateStartDate(info.start_day);
  setValidation({...validation,
    name : validateName,
    launchDate : validateLaunchDate
  });
  return validateName && validateLaunchDate && (branchInfo.branch_name !== info.branch_name ||
    branchInfo.mgr_id !== info.mgr_id || branchInfo.start_day !== info.start_day);
  }
  const sendData = async () => {
    if (validateInfo()){
    if (info.start_day === branchInfo.start_day)
      info.start_day = inputFormat(info.start_day);
    try {
      axios.put(`http://localhost:${port}/branch/update`,{
        branchID : info.branch_id,
        branchName : info.branch_name,
        startDay : info.start_day,
        mgrID : info.mgr_id
      });
    } catch (error) {
      console.log(error);   
    }
    setEdit(false); 
    }
  }
  useEffect(() => {
    getManagers();
  },[]);

  return (
    <div className="w-fit mx-auto mt-8">
    <div className="w-fit mx-auto mt-6 mb-2">
    <button className="capitalize py-2 px-4 bg-gray-300 rounded-md duration-300 hover:bg-gray-400"
    onClick={() => setEdit(!edit)}>edit branch</button>
    </div>
    {edit &&
    <div>
    <table>
    <colgroup>
    <col span={1} className="w-[110px]"/>
    <col span={1} className="w-[120px]"/>
    </colgroup>
    <tbody>
    <tr>
    <td className="py-2">
    <label htmlFor="name" 
    className={`text-[18px] mr-4 ${!validation.name && 'text-red-600'}`}>name</label>
    </td>
    <td className="py-2">
    <input type="text" id="name" className="bg-gray-200 py-2 px-4 rounded-md" 
    defaultValue={branchInfo.branch_name} onChange={(e) => setInfo({...info,branch_name : e.target.value})}/>
    </td>
    </tr>
    <tr>
    <td className="py-2">
    <label htmlFor="mgrID" 
    className={`text-[18px] mr-4`}>manager id</label>
    </td>
    <td className="py-2">
    <select id="mgrID" className="bg-gray-200 py-2 px-4 rounded-md"
    onChange={(e) => setInfo({...info,mgr_id : +e.target.value})}>
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
    className={`text-[18px] mr-4 ${!validation.launchDate && 'text-red-600'}`}>launch date</label>
    </td>
    <td className="py-2">
    <input type="date" id="startDate" className="bg-gray-200 py-2 px-4 rounded-md" 
    onChange={(e) => setInfo({...info,start_day : e.target.value})} defaultValue={startDate}/>
    </td>
    </tr>
    </tbody>
    </table>
    <div className="flex gap-8 justify-center mt-6">
    <button className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white
    duration-300 hover:bg-green-800" onClick={() => sendData()}>
    save
    </button>
    <button className="py-2 px-4 capitalize bg-gray-300 rounded-md
    duration-300 hover:bg-gray-400" onClick={() => setEdit(!edit)}>
    cancel
    </button>    
    </div>    
    </div>}
    </div>
  )
}

export default EditBranch;