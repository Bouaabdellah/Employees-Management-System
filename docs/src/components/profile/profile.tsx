import axios from 'axios';
import { useSelector } from 'react-redux';
import rootState from '../../interfaces/rootState';
import { useEffect, useState } from 'react';
import employee, { userInfoInitialze } from '../../interfaces/employee';
import Container from '../utils/container';
import EditeProfile from './editeProfile';
import ProfileInfo from './profileInfo';
import host from '../../utils/host';

function Profile() {
  const id = useSelector((state: rootState) => state.userInformation.id);
  const [userInfo, setUserInfo] = useState<employee>(userInfoInitialze);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`${host}/employees/get_employee`, {
            params: {
              id: id,
            },
          })
          .then((res) => {
            return res.data;
          });
        const employee = await response.employees[0];
        setUserInfo({ ...employee, password: '' });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-12">
      <Container>
        <ProfileInfo userInfo={userInfo} />
        <EditeProfile employee={userInfo} />
      </Container>
    </div>
  );
}

export default Profile;
