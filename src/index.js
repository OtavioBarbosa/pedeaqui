
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./layouts/Login";
import Sistema from "./layouts/Sistema";

import './assets/styles/style.css';
import './assets/font/fontawesome-free-5.13.0-web/css/all.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/pedeaqui" component={Sistema} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
