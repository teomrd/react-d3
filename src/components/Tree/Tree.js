import React from "react";
import PropTypes from "prop-types";
import Node from "../Node";
import "./style.css";

const Tree = ({ nodes, width, height, onNodeClick }) => {
  return (
    <svg width={width} height={height}>
      <g transform="translate(50, 50)">
        {nodes.map((node, i) => {
          const { x, y, name, parent } = node;

          return (
            <Node
              color={parent && parent._children ? "rgb(176, 196, 222)" : "#fff"}
              key={i}
              x={x}
              y={y}
              text={name}
              onNodeClick={() => onNodeClick(node)}
            />
          );
        })}
      </g>
    </svg>
  );
};

Tree.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  nodes: PropTypes.array,
  onNodeClick: PropTypes.func.isRequired,
};

Tree.defaultProps = {
  width: 0,
  height: 0,
  nodes: [],
};

export default Tree;
