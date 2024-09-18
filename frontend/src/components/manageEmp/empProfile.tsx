import { useLocation } from "react-router-dom"
import employee from "../../interfaces/employee";
import Container from "../utils/container";
import ProfileInfo from "../profile/profileInfo";

function EmpProfile() {
  const location = useLocation();
  const userInfo : employee = location.state;

  return (
    <div className="py-12">
    <Container>
    <ProfileInfo userInfo={userInfo}/>
    </Container>
    </div>
  )
}

export default EmpProfile