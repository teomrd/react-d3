import React, { useState } from "react";
import { useAvailableWidth } from "../NodeGraph/useAvailableWidth";
import Node from "../NodeGraph/Node";

const playgroundContainerSvgId = "playground-svg";

const Playground = () => {
  const [nodes, setNodes] = useState([]);
  const width = useAvailableWidth(`#${playgroundContainerSvgId}`);

  const handleClick = (e) => {
    const offsetTop = document.querySelector(`#${playgroundContainerSvgId}`)
      .parentNode.offsetTop;

    setNodes([
      ...nodes,
      {
        x: e.clientX,
        y: e.clientY - offsetTop,
      },
    ]);
  };

  return (
    <div>
      <svg id="playground-svg" width={width} height="800" onClick={handleClick}>
        {nodes.map((node, i) => (
          <Node
            key={i}
            position={{
              x: node.x,
              y: node.y,
            }}
            nodeSize={30}
            duration={0.25}
          />
        ))}
      </svg>
    </div>
  );
};

export default Playground;
