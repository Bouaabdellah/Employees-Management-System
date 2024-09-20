import { useLocation } from "react-router-dom";
import branch from "../../interfaces/branch";
import Container from "../utils/container";
import BranchInfo from "./branchInfo";


function Branch() {
  const location = useLocation();
  const branchInfo : branch = location.state;

  return (
    <div className="py-12">
    <Container>
    <BranchInfo branchInfo={branchInfo}/>
    </Container>
    </div>
  )
}

export default Branch;