import { Link } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <h1>Log in here.</h1>
      <Login />
      <p>No user? <Link to="/signup">Sign up here!</Link></p>
    </div>
  );
}

export default App;
