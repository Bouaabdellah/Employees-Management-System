import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { setSidebar } from "../stores/sidebar";
import rootState from "../interfaces/rootState";
import Container from "./container";

function Dashboard() {
  const dispatch = useDispatch();
  const username = useSelector((state : rootState) => state.userInformation.username);
  return (
    <div className="bg-gray-200">
    <Container>
    <div className="flex gap-4 items-center py-4">
    <div className='w-fit cursor-pointer text-xl' onClick={() => dispatch(setSidebar())}>
    <FaBars/>
    </div>
    <div className="capitalize text-xl">
    {username}
    </div>
    </div>
    </Container>
    </div>
  )
}

export default Dashboard;