import React, { useState, useRef } from "react";
import { useAvailableWidth } from "../NodeGraph/useAvailableWidth";
import Node from "../NodeGraph/Node";

const playgroundContainerSvgId = "playground-svg";

const Playground = () => {
  const [nodes, setNodes] = useState({});
  const width = useAvailableWidth(`#${playgroundContainerSvgId}`);
  const constraintsRef = useRef(null);

  const handleClick = (e) => {
    const offsetTop = document.querySelector(`#${playgroundContainerSvgId}`)
      .parentNode.offsetTop;

    setNodes({
      ...nodes,
      [Object.keys(nodes).length]: {
        x: e.clientX,
        y: e.clientY - offsetTop,
      },
    });
  };

  const onDragEnd = (e, info, i) => {
    const offsetTop = document.querySelector(`#${playgroundContainerSvgId}`)
      .parentNode.offsetTop;

    setNodes({
      ...nodes,
      [i]: {
        x: info.point.x,
        y: info.point.y - offsetTop,
      },
    });
  };

  return (
    <>
      <svg
        ref={constraintsRef}
        id="playground-svg"
        width={width}
        height="800"
        onDoubleClick={handleClick}
      >
        {Object.entries(nodes).map(([i, node]) => (
          <Node
            key={i}
            dragConstraints={constraintsRef}
            onDragEnd={(e, info) => onDragEnd(e, info, i)}
            position={{
              x: node.x,
              y: node.y,
            }}
            isDraggable={true}
            nodeSize={30}
          />
        ))}
      </svg>
    </>
  );
};

export default Playground;
