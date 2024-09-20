import { useEffect, useState } from "react";
import branch from "../../interfaces/branch";
import axios from "axios";
import { inputFormat } from "../../utils/date";

function EditBranch({branchInfo} : {branchInfo : branch}) {
  const port = process.env.REACT_APP_server_port;
  const [info,setInfo] = useState<branch>(branchInfo);
  const [edit,setEdit] = useState<boolean>(false);
  const [managers,setManagers] = useState<{super_id : number}[]>([]);
  const startDate = inputFormat(branchInfo.start_day);
  // fetch managers
  const getManagers = async () => {
    try {
    const managersResponse = await axios.get(`http://localhost:${port}/employees/get_managers`);
    setManagers(managersResponse.data.managers);
    } catch (error) {
      console.log(error);
      setManagers([]);  
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
    className={`text-[18px] mr-4`}>name</label>
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
    className={`text-[18px] mr-4`}>launch date</label>
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
    duration-300 hover:bg-green-800">
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