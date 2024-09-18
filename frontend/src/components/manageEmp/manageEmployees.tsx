import Container from '../utils/container';
import AddEmployee from './addEmployee';
import SearchEmployees from './searchEmployees';

function ManageEmployees() {
  return (
    <div className="py-12">
      <Container>
        <SearchEmployees/>
        <AddEmployee/>
      </Container>
    </div>
  );
}

export default ManageEmployees;
