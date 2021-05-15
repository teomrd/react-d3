import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Node = ({
  x,
  y,
  sourcePosition,
  r,
  color,
  text,
  onNodeClick,
  isClickable,
}) => {
  const { x: sx = x, y: sy = y } = sourcePosition;
  return (
    <motion.g
      className={`node ${isClickable ? "clickable" : ""}`}
      onClick={onNodeClick}
      initial={{ x: sx, y: sy, scale: 0 }}
      animate={{ x, y, scale: 1 }}
      exit={{ x: sx, y: sy, scale: 0 }}
      transition={{ duration: 0.75 }}
    >
      <circle r={r} style={{ fill: color }}></circle>
      <text x="0" dy={-r - 5} textAnchor="middle" style={{ fillOpacity: 1 }}>
        {text}
      </text>
    </motion.g>
  );
};

Node.propTypes = {
  r: PropTypes.number,
  self: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  sourcePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  duration: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
  isClickable: PropTypes.bool,
};

Node.defaultProps = {
  x: 0,
  y: 0,
  r: 30,
  duration: 750,
  color: "rgb(176, 196, 222)",
  text: "",
  isClickable: false,
  parent: {},
};

export default Node;
