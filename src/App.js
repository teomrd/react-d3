import React from "react";
import D3 from "./components/D3";
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
        <D3 />
      </main>
    </div>
  );
};

export default App;
