import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.scss";

// Components
import NavBar from "./components/NavBar";
import Registration from "./components/Registration";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/login">
          Login Page
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
        <Route exact path="/">
          Home
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
