import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Node = ({ parent, x, y, r, color, text, onNodeClick, isClickable }) => {
  const { x: sx = x, y: sy = y } = parent;
  return (
    <motion.g
      className={`node ${isClickable ? "clickable" : ""}`}
      onClick={onNodeClick}
      initial={{ x: sx, y: sy, opacity: 0 }}
      animate={{ x, y, opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <circle r={r} style={{ fill: color }}></circle>
      <text x="0" dy="-1.6em" textAnchor="middle" style={{ fillOpacity: 1 }}>
        {text}
      </text>
    </motion.g>
  );
};

Node.propTypes = {
  self: PropTypes.object,
  parent: PropTypes.object,
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
  parent: {},
};

export default Node;
