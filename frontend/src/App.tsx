import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Profile from './components/profile/profile';
import { useLocation } from 'react-router-dom';
import Dashboard from './components/utils/dashboard';
import Sidebar from './components/utils/sidebar';
import ManageEmployees from './components/manageEmp/manageEmployees';
import EmpProfile from './components/manageEmp/empProfile';
import Branches from './components/branches/branches';
import Branch from './components/branches/branch';

function LocationWrapper() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && (
        <div>
          <Dashboard />
          <Sidebar />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-employees" element={<ManageEmployees />} />
        <Route path='/employee_profile' element={<EmpProfile />}/>
        <Route path='/branches' element={<Branches/>}/>
        <Route path='/branch_info' element={<Branch/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div>
        <LocationWrapper />
      </div>
    </Router>
  );
}

export default App;
