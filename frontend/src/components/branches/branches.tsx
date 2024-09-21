import Container from "../utils/container";
import AddBranch from "./addBranch";
import AllBranches from "./allBranches";
import SearchBranch from "./searchBranch";


function Branches() {
  return (
    <div className="py-12">
    <Container>
    <SearchBranch/>
    <AllBranches/>
    <AddBranch/>
    </Container>
    </div>
  )
}

export default Branches;