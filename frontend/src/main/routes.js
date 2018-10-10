import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "../views/admin";
import Movies from "../views/movies";
import About from "../views/about";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Movies} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
