import axios from "axios";
import { useSelector } from "react-redux";
import rootState from "../interfaces/rootState";
import { useEffect, useState } from "react";
import employee from "../interfaces/employee";

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
  return (
    <div>
    {!userInfo ? 'there is no information' : userInfo.id}
    </div>
  )
}

export default Profile;