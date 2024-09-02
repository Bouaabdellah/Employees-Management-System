import { Route,Routes,BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
