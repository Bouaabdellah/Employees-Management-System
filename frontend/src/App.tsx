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
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <LocationWrapper />
      </div>
    </Router>
  );
}

export default App;
