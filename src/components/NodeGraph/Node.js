import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Node = ({
  position,
  enterPosition,
  exitPosition,
  nodeSize,
  color,
  text,
  onNodeClick,
  isClickable,
  duration,
  dragConstraints,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseUp,
  isDraggable,
  ringColor,
  ringSize,
}) => {
  const { x, y } = position;
  const { x: ix = x, y: iy = y } = enterPosition;
  const { x: ox = x, y: oy = y } = exitPosition;
  const r = nodeSize / 2;
  return (
    <motion.g
      drag={isDraggable}
      dragConstraints={dragConstraints}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      className={`node ${isClickable ? "clickable" : ""}`}
      onClick={onNodeClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      initial={{ x: ix, y: iy, scale: 0 }}
      animate={{ x, y, scale: 1 }}
      exit={{ x: ox, y: oy, scale: 0 }}
      transition={{ duration }}
    >
      <motion.circle
        animate={{ r: r }}
        style={{
          fill: color,
          cursor: isDraggable ? "grab" : "pointer",
          stroke: ringColor,
          strokeWidth: ringSize,
        }}
      ></motion.circle>
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
  nodeSize: PropTypes.number,
  duration: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  isClickable: PropTypes.bool,
  isDraggable: PropTypes.bool,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  dragConstraints: PropTypes.object,
  ringColor: PropTypes.string,
  ringSize: PropTypes.string,
};

Node.defaultProps = {
  position: {
    x: 0,
    y: 0,
  },
  enterPosition: {},
  exitPosition: {},
  nodeSize: 60,
  duration: 0.75,
  color: "#fff",
  ringColor: "rgba(0,0,0,0.5)",
  ringSize: "1px",
  text: "",
  isClickable: false,
  isDraggable: false,
};

export default Node;
