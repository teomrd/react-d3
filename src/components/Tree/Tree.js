import React from "react";
import PropTypes from "prop-types";
import Node from "../Node";

const Tree = ({ nodes, width, height }) => {
  return (
    <svg width={width} height={height}>
      {nodes.map(({ parent }, i) => {
        return parent && <Node x={parent.x} y={parent.y} key={i} />;
      })}
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
