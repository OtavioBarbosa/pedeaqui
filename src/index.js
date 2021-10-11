
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import Sistema from "./layouts/Sistema";
import './assets/styles/style.css';
import './assets/font/fontawesome-free-5.13.0-web/css/all.min.css';
import { isAuthenticated } from "./services/auth";

// import { registerServiceWorker } from './serviceWorker'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/pedeaqui" component={Sistema} />
      <Route path="/" component={Login} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
  
// registerServiceWorker();