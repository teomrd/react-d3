import React from "react";
import NodeGraph from "./components/NodeGraph/index";
import "./index.css";
import "./App.css";
import SmoothySubText from "./components/SmoothySubText";
import data from "./data/flare.json";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="App">
      <header style={{ marginBottom: "20px" }}>
        <Nav />
        <h1>React + D3</h1>
        <div>
          <SmoothySubText>
            <i>are friends </i> 😈
          </SmoothySubText>
        </div>
      </header>
      <main>
        <NodeGraph id="node-graph-svg" data={data} nodeSize={50} />
      </main>
    </div>
  );
};

export default App;
