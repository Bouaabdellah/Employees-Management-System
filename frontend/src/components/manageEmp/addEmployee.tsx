import { useEffect, useState } from "react"
import employee,{userInfoInitialze} from "../../interfaces/employee";
import axios from "axios";
import branch, { branchInit } from "../../interfaces/branch";
import role, { roleInit } from "../../interfaces/role";
import validatePersonalInfo from "../../config/validateEmployeeInfo";
import personalInfo, { validationInitialze } from "../../interfaces/validation";
import checkAllTrue from "../../config/checkAllTrue";
import { validateStartDate } from "../../config/validation";

const port = process.env.REACT_APP_server_port;

function AddEmployee() {
  // stats
  const [userInfo,setUserInfo] = useState<employee>(userInfoInitialze);
  const [validation,setValidation] = useState<personalInfo>(validationInitialze);
  const [startDate,setStartDate] = useState<boolean>(true);
  const [addEmp,setAddEmp] = useState<boolean>(false);
  const [branches,setBranches] = useState<branch[]>([branchInit]);
  const [roles,setRoles] = useState<role[]>([roleInit]);
  const [managers,setManagers] = useState<{super_id : number}[]>([{super_id : 0}]);
  // fetch data
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
        setUserInfo({...userInfo,branch_id : defaultBranch,
            role_id : defaultRole, super_id : defaultManager
        });
    } catch (error) {
        console.log(error);
    }
    }
  // add new employee
  const addEmployee = async () => {
  try {
  await axios.post(`http://localhost:${port}/employees/add_employee`,{
    firstname : userInfo.firstname,
    lastname : userInfo.lastname,
    sex : userInfo.sex,
    birthdate : userInfo.birthday,
    email : userInfo.email,
    password : userInfo.password,
    mgrID : userInfo.super_id,
    branchID : userInfo.branch_id,
    roleID : userInfo.role_id,
    startDay : userInfo.start_day,
    salary : userInfo.salary,
    image_url : userInfo.image_url
  });  
  } catch (error) {
    console.log(error);
  }}
  const validateData = () : void => {
  const {firstnameValidation,lastnameValidation,birthdateValidation,
  emailValidation,pwdValidation} = validatePersonalInfo(userInfo);
  setValidation({...validation,
    firstname : firstnameValidation,
    lastname : lastnameValidation,
    birthday : birthdateValidation,
    email : emailValidation,
    password : pwdValidation
  });
  }
  const confirmValidation = () : boolean => {
    const allValid : boolean = checkAllTrue(validation);
    const validateStartDay : boolean = validateStartDate(userInfo.start_day);
    setStartDate(validateStartDay);
    return allValid && validateStartDay;
  }
  const checkData = async () => {
  validateData();
  if (confirmValidation()){
    console.log('valid');
    //await addEmployee();
    //setAddEmp(false);
  }
  else
  console.log('invalid');
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
    <select id="branch" className="bg-gray-200 py-2 px-4 rounded-md"
    onChange={(e) => setUserInfo({...userInfo,branch_id : +e.target.value})}>
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
    onChange={(e) => setUserInfo({...userInfo,role_id : +e.target.value})}>
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
    onChange={(e) => setUserInfo({...userInfo,super_id : +e.target.value})}>
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
    className={`text-[18px] mr-4 ${!startDate && 'text-red-600'}`}>start date</label>
    </td>
    <td className="py-2">
    <input type="date" id="startDate" className="bg-gray-200 py-2 px-4 rounded-md"
    onChange={(e) => setUserInfo({...userInfo,start_day : e.target.value})}/>
    </td>
    </tr>
    <tr>
    <td className="py-2">
    <label htmlFor="salary" 
    className={`text-[18px] mr-4`}>salary</label>
    </td>
    <td className="py-2">
    <input type="number" id="salary" className="bg-gray-200 py-2 px-4 rounded-md" 
    placeholder="algerian dinar AD" onChange={(e) => setUserInfo({...userInfo,salary : +e.target.value})}/>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    <div className="flex gap-8 justify-center mt-6">
        <button className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white 
        duration-300 hover:bg-green-800" onClick={(e) => checkData()}>
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