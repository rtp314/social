import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <p>Content will be loaded here when logged in</p>
      <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link>
    </div>
  );
}

export default App;
