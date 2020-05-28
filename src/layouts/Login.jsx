
import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../routes.js";

class Login extends React.Component {

  constructor(props){
    super(props)
    this.state ={

    }
    
  }

  componentDidMount(){

  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
      </>
    );
  }
}

export default Login;
