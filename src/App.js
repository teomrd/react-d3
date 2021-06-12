import React from "react";
import NodeGraph from "./components/NodeGraph/index";
import "./index.css";
import "./App.css";
import SmoothySubText from "./components/SmoothySubText";
import data from "./data/flare.json";
import Nav from "./components/Nav";
import Playground from "./components/Playground/Playground";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header style={{ marginBottom: "20px" }}>
          <Nav />
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <>
                <h1>React + D3</h1>
                <div>
                  <SmoothySubText>
                    <i>are friends </i> 😈
                  </SmoothySubText>
                </div>
                <NodeGraph id="node-graph-svg" data={data} nodeSize={50} />
              </>
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
