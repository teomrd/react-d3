import React from "react";
import NodeGraph from "./components/NodeGraph/index";
import "./App.css";

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
          <i>are friends </i> 😈
        </div>
      </header>
      <main>
        <NodeGraph />
      </main>
    </div>
  );
};

export default App;
