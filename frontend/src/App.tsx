import { Route,Routes,BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
