import axios from "axios";
import { useSelector } from "react-redux";
import rootState from "../interfaces/rootState";
import { useEffect, useState } from "react";
import employee from "../interfaces/employee";
import Container from "./container";
import EditeProfile from "./editeProfile";

function Profile() {
  const id = useSelector((state : rootState) => state.userInformation.id);
  const [userInfo,setUserInfo] = useState<employee>({
  id : 0,
  firstname : '',
  lastname : '',
  sex : 'M',
  birthday : '',
  start_day : '',
  email : '',
  salary : 0,
  super_id : 0,
  branch_id : 0,
  role_id : 0,
  image_url : null
  });
  useEffect(() => {
    const fetchData = async () => {
        const port = process.env.REACT_APP_server_port;
        try {
          const response = await axios.get(`http://localhost:${port}/employees/get_employee`,{
            params : {
                id : id
            }}
          ).then((res) => {
            return res.data;
          });  
          const employee = await response.employees[0];
          setUserInfo(employee);
        } catch (error) {
           console.log(error);
        }
    }
    fetchData();
  },[]);
  const username = useSelector((state : rootState) => state.userInformation.username);
  const [edit,setEdit] = useState(false);

  return (
    <div className="py-12">
    <Container>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 bg-gray-200 p-8 rounded-lg">
    <div className="py-6 px-8 border border-solid border-gray-400 bg-white rounded-lg">
      <img src="" alt="avatar" className="bg-gray-600 rounded-full w-[100px] h-[100px] mb-2 mx-auto
      flex justify-center items-center text-white capitalize"/>
      <div className="capitalize md:text-xl font-semibold mb-4 text-center">
      {username}
      </div>
      <div className="flex flex-col">
        <span className="capitalize">email address :</span>
        <span className="text-blue-800 cursor-pointer">{userInfo.email}</span>
      </div>
    </div>
    <div className="py-6 px-8 border border-solid border-gray-400 bg-white rounded-lg flex flex-col gap-3">
      <div className="text-[20px] capitalize mb-2 font-[300]">
        personal information
      </div>
      <div>
        <span className="text-[18xp] capitalize font-semibold mr-2">firstname :</span>
        <span className="text-blue-800 capitalize">{userInfo.firstname}</span>
      </div>
      <div>
        <span className="text-[18xp] capitalize font-semibold mr-2">lastname :</span>
        <span className="text-blue-800 capitalize">{userInfo.lastname}</span>
      </div>
      <div>
        <span className="text-[18xp] capitalize font-semibold mr-2">sex :</span>
        <span className="text-blue-800 capitalize">{userInfo.sex}</span>
      </div>
      <div>
        <span className="text-[18xp] capitalize font-semibold mr-2">birthdate :</span>
        <span className="text-blue-800 capitalize">{userInfo.birthday}</span>
      </div>
    </div> 
    <div className="py-6 px-8 border border-solid border-gray-400 bg-white rounded-lg flex flex-col gap-3">
      <div className="text-[20px] capitalize mb-2 font-[300]">
        work information
      </div>
      <div>
      <span className="text-[18xp] capitalize font-semibold mr-2">ID :</span>
      <span className="text-blue-800 capitalize">{userInfo.id}</span>
      </div>
      <div>
      <span className="text-[18xp] capitalize font-semibold mr-2">branch ID :</span>
      <span className="text-blue-800 capitalize">{userInfo.branch_id}</span>
      </div>
      <div>
      <span className="text-[18xp] capitalize font-semibold mr-2">manager ID :</span>
      <span className="text-blue-800 capitalize">{userInfo.super_id}</span>
      </div>
      <div>
      <span className="text-[18xp] capitalize font-semibold mr-2">role ID :</span>
      <span className="text-blue-800 capitalize">{userInfo.role_id}</span>
      </div>
      <div>
      <span className="text-[18xp] capitalize font-semibold mr-2">start at :</span>
      <span className="text-blue-800 capitalize">{userInfo.start_day}</span>
      </div>
      <div>
      <span className="text-[18xp] capitalize font-semibold mr-2">salary :</span>
      <span className="text-blue-800 capitalize">{userInfo.salary}$</span>
      </div>
    </div> 
    </div>
    <div className="w-fit mx-auto mt-6 mb-2">
      <button className="capitalize py-2 px-4 bg-gray-300 rounded-md duration-300 hover:bg-gray-400"
      onClick={() => setEdit(!edit)}>edit profile</button>
    </div>
    {edit &&
    <div>
    <EditeProfile employee={userInfo}/> 
    </div>}
    </Container>
    </div>
  )
}

export default Profile;

// normal information
// personal information
// work information