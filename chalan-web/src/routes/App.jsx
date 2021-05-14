import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

// Create new bundle file for Home
const Complain = loadable(() => import("./../pages/complain/index.jsx"));
const Chalan = loadable(() => import("./../pages/chalan/index.jsx"));
const Success = loadable(() => import("./../pages/success/index.jsx"));

const App = (props) => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Complain} />
          <Route exact path="/chalan/:id" component={Chalan} />
          <Route exact path="/success/:id" component={Success} />
        </Switch>
    </BrowserRouter>
  );
};

export default App;
