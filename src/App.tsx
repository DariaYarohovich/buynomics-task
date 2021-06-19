import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import "./App.css";
import {
  IntermediariesList,
  CreateIntermediaryForm,
  EditIntermediaryForm,
  ProductsList,
} from "./pages";

function App() {
  return (
    <div>
      <header className="app__header">
        <nav>
          <ul className="app__nav">
            <li className="app__navItem">
              <NavLink
                to="/intermediary/list"
                className="app__navItemLink"
                activeClassName="app__navItemLink--active"
              >
                Intermediaries
              </NavLink>
            </li>
            <li className="app__navItem">
              <NavLink
                to="/product/list"
                className="app__navItemLink"
                activeClassName="app__navItemLink--active"
              >
                Products
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route
          path="/intermediary/list"
          component={IntermediariesList}
          exact={true}
        />
        <Route
          path="/intermediary/create"
          component={CreateIntermediaryForm}
          exact={true}
        />
        <Route
          path="/intermediary/edit/:id"
          component={EditIntermediaryForm}
          exact={true}
        />

        <Route path="/product/list" component={ProductsList} exact={true} />
      </Switch>
    </div>
  );
}

export default App;
