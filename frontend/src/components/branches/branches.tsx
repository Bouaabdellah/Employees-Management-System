import Container from "../utils/container";
import AllBranches from "./allBranches";
import SearchBranch from "./searchBranch";


function Branches() {
  return (
    <div className="py-12">
    <Container>
    <SearchBranch/>
    <AllBranches/>
    </Container>
    </div>
  )
}

export default Branches;