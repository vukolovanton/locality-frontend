import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Utils
import { store, persistor } from "./state/store";
import "./styles/index.scss";

// Components
import ProtectedRoute from "./components/shared/ProtectedRoute";
import NavBar from "./components/NavBar";
import UserRegistration from "./components/Registration/UserRegistration";
import LocalityCreation from "./components/Registration/LocalityCreation";
import Home from "./components/Home";
import Login from "./components/Login";
import Issues from "./components/Issues";
import SingleIssuePage from "./components/Issues/SingleIssuePage";
import Announcements from "./components/Announcements";
import SingleAnnouncementPage from "./components/Announcements/SingleAnnouncementPage";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/registration">
              <UserRegistration />
            </Route>
            <Route exact path="/registration/create-locality">
              <LocalityCreation />
            </Route>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/issues" component={Issues} />
            <ProtectedRoute path="/issues/:id" component={SingleIssuePage} />
            <ProtectedRoute
              exact
              path="/announcements"
              component={Announcements}
            />
            <ProtectedRoute
              path="/announcements/:id"
              component={SingleAnnouncementPage}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
