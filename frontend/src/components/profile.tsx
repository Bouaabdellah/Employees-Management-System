import axios from "axios";
import { useSelector } from "react-redux";
import rootState from "../interfaces/rootState";
import { useEffect, useState } from "react";
import employee from "../interfaces/employee";
import Container from "./container";

function Profile() {
  const id = useSelector((state : rootState) => state.userInformation.id);
  const [userInfo,setUserInfo] = useState<employee | null>(null);
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
  console.log(userInfo?.birthday);

  return (
    <Container>
    <div>
      <img src="" alt="avatar" className="bg-gray-600 rounded-full w-[100px] h-[100px]
      flex justify-center items-center text-white capitalize"/>
      <div className="capitalize md:text-xl font-semibold">
      {username}
      </div>
      <div className="flex flex-col">
        <span className="capitalize">email address :</span>
        <span className="text-blue-800 cursor-pointer">{userInfo?.email}</span>
      </div>
    </div>
    <div>
      <div>
        <span>firstname</span>
        <span>{userInfo?.firstname}</span>
      </div>
      <div>
        <span>lastname</span>
        <span>{userInfo?.lastname}</span>
      </div>
      <div>
        <span>sex</span>
        <span>{userInfo?.sex}</span>
      </div>
      <div>
        <span>birthdate</span>
        <span></span>
      </div>
    </div>
    </Container>
  )
}

export default Profile;

// normal information
// personal information
// work information