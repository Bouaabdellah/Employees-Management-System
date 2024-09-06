import { useSelector,useDispatch } from "react-redux";
import rootState from "../interfaces/rootState";
import { FaBars } from "react-icons/fa";
import { setSidebar } from "../stores/sidebar";

function Dashboard() {
  const displaySidebar = useSelector((state : rootState) => state.sidebar.displaySidebar);
  const dispatch = useDispatch();
  return (
    <div>
    <div className='w-fit cursor-pointer' onClick={() => dispatch(setSidebar())}>
    <FaBars/>
    </div>
    </div>
  )
}

export default Dashboard;