import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.scss";

// Components
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login">Login Page</Route>
        <Route path="/registration">Registration</Route>
        <Route path="/">Home</Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
