import { useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { setSidebar } from '../../stores/sidebar';
import Container from './container';

function Dashboard() {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-200 shadow-lg">
      <Container>
        <div className="flex gap-4 items-center py-4">
          <div
            className="w-fit cursor-pointer text-xl p-1 border border-solid border-gray-400 rounded-md"
            onClick={() => dispatch(setSidebar())}
          >
            <FaBars />
          </div>
          <div className="capitalize text-xl">employees mangament system</div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
