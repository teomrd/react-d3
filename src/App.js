import React from "react";
import NodeGraph from "./components/NodeGraph/index";
import "./App.css";
import SmoothySubText from "./components/SmoothySubText";

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
        <NodeGraph id="node-graph-svg" />
      </main>
    </div>
  );
};

export default App;
