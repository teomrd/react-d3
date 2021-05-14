import React from "react";
import PropTypes from "prop-types";
import Node from "../Node";
import "./style.css";

const Tree = ({ nodes, width, height }) => {
  return (
    <svg width={width} height={height}>
      <g transform="translate(50, 50)">
        {nodes.map(({ parent }, i) => {
          return (
            parent && (
              <Node
                color={parent._children ? "rgb(176, 196, 222)" : "#fff"}
                key={i}
                x={parent.x}
                y={parent.y}
                text={parent.name}
              />
            )
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
};

Tree.defaultProps = {
  width: 0,
  height: 0,
  nodes: [],
};

export default Tree;
