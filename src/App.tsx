import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Photos from "./components/Photos";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact={true} path="/" />
        <Route component={Photos} path="/photos" />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
