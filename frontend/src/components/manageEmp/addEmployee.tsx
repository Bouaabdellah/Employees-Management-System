import { useEffect, useState } from "react"
import employee from "../../interfaces/employee";
import axios from "axios";
import branch, { branchInit } from "../../interfaces/branch";
import role, { roleInit } from "../../interfaces/role";

const port = process.env.REACT_APP_server_port;
const userInfoInitialze : employee = {
    id : 0,
    firstname : '',
    lastname : '',
    sex : 'M',
    email : '',
    password : '',
    birthday : '',
    start_day : '',
    salary : 0,
    super_id : 0,
    role_id : 0,
    branch_id : 0,
    image_url : null
};
const validationInitialze = {
    email : true,
    firstname : true,
    lastname : true,
    birthday : true,
    password : true,
    image : true
};

function AddEmployee() {
  // stats
  const [userInfo,setUserInfo] = useState<employee>(userInfoInitialze);
  const [validation,setValidation] = useState(validationInitialze);
  const [addEmp,setAddEmp] = useState<boolean>(false);
  const [branches,setBranches] = useState<branch[]>([branchInit]);
  const [roles,setRoles] = useState<role[]>([roleInit]);
  const [managers,setManagers] = useState<{super_id : number}[]>([{super_id : 0}]);
  // fetch data
  const fetchWorkChoises = async () => {
    try {
        const branchResponse = await axios.get(`http://localhost:${port}/branch/get_all`);
        setBranches(branchResponse.data.branches);
        const roleResponse = await axios.get(`http://localhost:${port}/role/roleList`);
        setRoles(roleResponse.data.rolesList);
        const managersResponse = await axios.get(`http://localhost:${port}/employees/get_managers`);
        setManagers(managersResponse.data.managers);
    } catch (error) {
        console.log(error);
    }
    }
  useEffect(() => {
  fetchWorkChoises();
  },[]);

  return (
    <div>
    <div>
        <button onClick={(e) => setAddEmp(true)} className="py-2 px-4 capitalize bg-green-700 mr-6 
        rounded-md text-white duration-300 hover:bg-green-800">
            new employee
        </button>
    </div>
    {addEmp &&
    <div className="w-fit mx-auto mt-10">
    <div className="flex flex-wrap gap-6 md:gap-24">
    <div>
    <div className="capitalize text-xl font-semibold mb-4">
    personal information
    </div>
    <table>
        <colgroup>
        <col span={1} className="w-[50px]"/>
        <col span={1} className="w-[120px]"/>
        </colgroup>
        <tbody>
        <tr>
        <td className="py-2">
        <label htmlFor="firstname" 
        className={`text-[18px] mr-4 ${!validation.firstname && 'text-red-600'}`}>firstname</label>
        </td>
        <td className="py-2">
        <input type="text" id="firstname" className="bg-gray-200 py-2 px-4 rounded-md" 
        onChange={(e) => setUserInfo({...userInfo,firstname : e.target.value})} placeholder="firstname..."/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="lastname" 
        className={`text-[18px] mr-4 ${!validation.lastname && 'text-red-600'}`}>lastname</label>
        </td>
        <td className="py-2">
        <input type="text" id="lastname" className="bg-gray-200 py-2 px-4 rounded-md" 
        onChange={(e) => setUserInfo({...userInfo,lastname : e.target.value})} placeholder="lastname..."/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="sex" className="text-[18px] mr-4">sex</label>
        </td>
        <td className="py-2">
        <select name="sex" id="sex" className="bg-gray-200 py-2 px-4 rounded-md" 
        onChange={(e) => setUserInfo({...userInfo,sex : e.target.value === "M" ? 'M' : 'F'})}>
        <option value="M">M</option>
        <option value="F">F</option>
        </select>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="birthdate" 
        className={`text-[18px] mr-4 ${!validation.birthday && 'text-red-600'}`}>birthdate</label>
        </td>
        <td className="py-2">
        <input type="date" id="birthdate" className="bg-gray-200 py-2 px-4 rounded-md" 
        onChange={(e) => setUserInfo({...userInfo,birthday : e.target.value})}/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="email" 
        className={`text-[18px] mr-4 ${!validation.email && 'text-red-600'}`}>email</label>
        </td>
        <td className="py-2">
        <input type="email" id="email" className="bg-gray-200 py-2 px-4 rounded-md" 
        onChange={(e) => setUserInfo({...userInfo,email : e.target.value})}
        autoComplete="off" placeholder="email..."/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="pwd" 
        className={`text-[18px] mr-4 ${!validation.password && 'text-red-600'}`}>password</label>
        </td>
        <td className="py-2">
        <input type="password" id="pwd" className="bg-gray-200 py-2 px-4 rounded-md"
        onChange={(e) => setUserInfo({...userInfo,password : e.target.value})}
        autoComplete="off" placeholder="password..."/>
        </td>
        </tr>   
        <tr>
        <td className="py-2">
        <label htmlFor="image" 
        className={`text-[18px] mr-4 ${!validation.image && 'text-red-600'}`}>image</label>
        </td>
        <td className="py-2">
        <input type="url" id="image" className="bg-gray-200 py-2 px-4 rounded-md"
        onChange={(e) => setUserInfo({...userInfo,image_url : e.target.value})}
        autoComplete="off" placeholder="image..."/>
        </td>
        </tr> 
        </tbody>
       </table>    
    </div>
    <div>
    <div className="capitalize text-xl font-semibold mb-4">
    work information
    </div>
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
    <select id="branch" className="bg-gray-200 py-2 px-4 rounded-md">
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
    <select id="role" className="bg-gray-200 py-2 px-4 rounded-md">
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
    <select id="mgrID" className="bg-gray-200 py-2 px-4 rounded-md">
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
    className={`text-[18px] mr-4`}>start date</label>
    </td>
    <td className="py-2">
    <input type="date" id="startDate" className="bg-gray-200 py-2 px-4 rounded-md"/>
    </td>
    </tr>
    <tr>
    <td className="py-2">
    <label htmlFor="salary" 
    className={`text-[18px] mr-4`}>salary</label>
    </td>
    <td className="py-2">
    <input type="number" id="salary" className="bg-gray-200 py-2 px-4 rounded-md" 
    placeholder="algerian dinar AD"/>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    <div className="flex gap-8 justify-center mt-6">
        <button className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white 
        duration-300 hover:bg-green-800">
            add employee
        </button>
        <button onClick={(e) => setAddEmp(false)} className="py-2 px-4 capitalize bg-gray-300 rounded-md
        duration-300 hover:bg-gray-400">
            cancel
        </button>
    </div>
    </div>
    }
    </div>
  )
}

export default AddEmployee