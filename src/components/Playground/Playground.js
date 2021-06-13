import React, { useState, useRef } from "react";
import { useAvailableWidth } from "../NodeGraph/useAvailableWidth";
import Node from "../NodeGraph/Node";
const colors = require("tailwindcss/colors");

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

  const onMouseUp = (i) => {
    const node = nodes[i];
    setNodes({
      ...nodes,
      [i]: {
        ...node,
        isDragged: false,
      },
    });
  };

  const onMouseDown = (i) => {
    const node = nodes[i];
    setNodes({
      ...nodes,
      [i]: {
        ...node,
        isDragged: true,
      },
    });
  };

  const onDragEnd = (e, info, i) => {
    const offsetTop = document.querySelector(`#${playgroundContainerSvgId}`)
      .parentNode.offsetTop;
    setNodes({
      ...nodes,
      [i]: {
        isDragged: false,
        x: info.point.x,
        y: info.point.y - offsetTop,
      },
    });
  };

  return (
    <>
      <svg
        className="bg-darker"
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
            onDragStart={() => {}}
            onDragEnd={(e, info) => onDragEnd(e, info, i)}
            position={{
              x: node.x,
              y: node.y,
            }}
            onNodeClick={() => {}}
            onMouseDown={() => onMouseDown(i)}
            onMouseUp={() => onMouseUp(i)}
            isDraggable={true}
            nodeSize={node.isDragged ? 40 : 50}
            color={colors.indigo[500]}
            ringColor={colors.indigo[800]}
            ringSize={3}
          />
        ))}
      </svg>
    </>
  );
};

export default Playground;
