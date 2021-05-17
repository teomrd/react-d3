import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Node = ({
  position,
  enterPosition,
  exitPosition,
  r,
  color,
  text,
  onNodeClick,
  isClickable,
  duration,
}) => {
  const { x, y } = position;
  const { x: ix = x, y: iy = y } = enterPosition;
  const { x: ox = x, y: oy = y } = exitPosition;

  return (
    <motion.g
      className={`node ${isClickable ? "clickable" : ""}`}
      onClick={onNodeClick}
      initial={{ x: ix, y: iy, scale: 0 }}
      animate={{ x, y, scale: 1 }}
      exit={{ x: ox, y: oy, scale: 0 }}
      transition={{ duration }}
    >
      <circle r={r} style={{ fill: color }}></circle>
      <text x="0" dy={-r - 5} textAnchor="middle" style={{ fillOpacity: 1 }}>
        {text}
      </text>
    </motion.g>
  );
};

Node.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  enterPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  exitPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  r: PropTypes.number,
  duration: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
  isClickable: PropTypes.bool,
};

Node.defaultProps = {
  position: {
    x: 0,
    y: 0,
  },
  enterPosition: {},
  exitPosition: {},
  r: 30,
  duration: 0.75,
  color: "#fff",
  text: "",
  isClickable: false,
};

export default Node;
