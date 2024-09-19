import Container from '../utils/container';
import AddEmployee from './addEmployee';
import AllEmployees from './allEmployees';
import SearchEmployees from './searchEmployees';

function ManageEmployees() {
  return (
    <div className="py-12">
      <Container>
        <SearchEmployees/>
        <AllEmployees/>
        <AddEmployee/>
      </Container>
    </div>
  );
}

export default ManageEmployees;
