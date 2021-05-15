import React from "react";
import PropTypes from "prop-types";

const Node = ({ x, y, r, color, text, onNodeClick }) => {
  return (
    <g
      className="node"
      transform={`translate(${x},${y})`}
      onClick={onNodeClick}
    >
      <circle r={r} style={{ fill: color }}></circle>
      <text x="0" dy="-1.6em" textAnchor="middle" style={{ fillOpacity: 1 }}>
        {text}
      </text>
    </g>
  );
};

Node.propTypes = {
  self: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
};

Node.defaultProps = {
  x: 0,
  y: 0,
  r: 20,
  color: "rgb(176, 196, 222)",
  text: "",
};

export default Node;