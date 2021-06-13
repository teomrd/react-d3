import React from "react";
import D3Graph from "./pages/D3graph";
import "./index.css";
import "./App.css";
import Nav from "./components/Nav";
import Playground from "./components/Playground/Playground";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <Nav />
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <D3Graph />
            </Route>
            <Route path="/playground">
              <Playground />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
