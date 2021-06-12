import React, { useState } from "react";
import { useAvailableWidth } from "../NodeGraph/useAvailableWidth";

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
          <circle key={i} cx={node.x} cy={node.y} r="10" fill="red" />
        ))}
      </svg>
    </div>
  );
};

export default Playground;
