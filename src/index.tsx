import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Utils
import { store, persistor } from "./state/store";
import "./styles/index.scss";

// Components
import NavBar from "./components/NavBar";
import Registration from "./components/Registration";
import LocalityCreation from "./components/Registration/LocalityCreation";
import Home from "./components/Home";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/login">
              Login Page
            </Route>
            <Route exact path="/registration">
              <Registration />
            </Route>
            <Route exact path="/registration/create-locality">
              <LocalityCreation />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
