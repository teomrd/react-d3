import React from "react";
import NodeGraph from "../components/NodeGraph";
import SmoothySubText from "../components/SmoothySubText";
import data from "../data/flare.json";

const D3react = () => {
  return (
    <>
      <h1 className="text-xl m-2.5">React + D3</h1>
      <div>
        <SmoothySubText>
          <i>are friends </i> 😈
        </SmoothySubText>
      </div>
      <NodeGraph id="node-graph-svg" data={data} nodeSize={50} />
    </>
  );
};

export default D3react;
