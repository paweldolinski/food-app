import React from "react";
import { render } from "react-dom";
import "./main.scss";
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Results from "./components/results/Results";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

render(
  <Router hisotry={history}>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/results" component={Results} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);

// serviceWorker.unregister();
