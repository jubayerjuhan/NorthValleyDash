import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Project from "./components/Project";
import Home from "./page/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={Home} path="/"/>
        <Route Component={Project} path="/project/:project_id"/>
      </Routes>
    </Router>
  );
}

export default App;
