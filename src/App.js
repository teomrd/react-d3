import React from "react";
import NodeGraph from "./components/NodeGraph/index";
import "./App.css";
import SmoothySubText from "./components/SmoothySubText";
import data from "./data/flare.json";

const App = () => {
  return (
    <div className="App">
      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            marginBottom: "5px",
          }}
        >
          React + D3
        </h1>
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
