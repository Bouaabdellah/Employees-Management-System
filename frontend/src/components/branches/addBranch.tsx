import { useState } from "react";
import branch, { branchInit } from "../../interfaces/branch";
import { useSelector } from "react-redux";
import rootState from "../../interfaces/rootState";
import { validateNames, validateStartDate } from "../../config/validation";
import port from "../../utils/port";
import axios from "axios";

function AddBranch() {
  const managers = useSelector((state : rootState) => state.choises.managers);
  const [info,setInfo] = useState<branch>({...branchInit,mgr_id : managers[0].super_id});
  const [add,setAdd] = useState<boolean>(false);
  const [validation,setValidation] = useState<{name : boolean; launchDate : boolean}>({
    name : true,
    launchDate : true
  });
  const checkData = () : boolean => {
    const nameValidation = validateNames(info.branch_name);
    const launchDateValidation = validateStartDate(info.start_day);
    setValidation({...validation,
      name : nameValidation,
      launchDate : launchDateValidation
    });
    return nameValidation && launchDateValidation;
  }
  const sendData = async () => {
  try {
    if (checkData()){
    axios.post(`http://localhost:${port}/branch/add_branch`,{
    branchName : info.branch_name,
    mgrID : info.mgr_id,
    startDay : info.start_day
    });
    }
  } catch (error) {
    console.log(error);
  }
  setAdd(false); 
  }

  return (
    <div>
    <div>
        <button onClick={(e) => setAdd(true)} className="py-2 px-4 capitalize bg-green-700 mr-6 
        rounded-md text-white duration-300 hover:bg-green-800">
            new branch
        </button>
    </div>
    {add &&
    <div className="w-fit mx-auto mt-10">
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
    placeholder="name..." onChange={(e) => setInfo({...info,branch_name : e.target.value})}/>
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
    onChange={(e) => setInfo({...info,start_day : e.target.value})}/>
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
    duration-300 hover:bg-gray-400" onClick={() => setAdd(false)}>
    cancel
    </button>    
    </div>    
    </div>}
    </div>
  )
}

export default AddBranch