import React from "react";
import PropTypes from "prop-types";

const Node = ({ x, y, r, color, text, onNodeClick, isClickable, duration }) => {
  return (
    <g
      className={`node ${isClickable ? "clickable" : ""}`}
      // transform={`translate(${x},${y})`}
      style={{
        transform: `translate(${x}px,${y}px)`,
        transition: `transform ${duration}ms ease-in-out`,
      }}
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
  duration: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
  isClickable: PropTypes.bool,
};

Node.defaultProps = {
  x: 0,
  y: 0,
  r: 20,
  duration: 750,
  color: "rgb(176, 196, 222)",
  text: "",
  isClickable: false,
};

export default Node;
