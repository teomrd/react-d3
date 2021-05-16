import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import { motion } from "framer-motion";

let diagonal = d3.svg.diagonal().projection((d) => [d.x, d.y]);

const getDiagonal = (source, target) => diagonal({ source, target });

const Link = ({ source, target, sourcePosition }) => {
  const { x: sx = source.x, y: sy = source.y } = sourcePosition;
  const enterPosition = { x: sx, y: sy };
  return (
    <motion.path
      initial={{ d: getDiagonal(enterPosition, enterPosition) }}
      animate={{ d: getDiagonal(source, target), opacity: 1 }}
      transition={{ duration: 0.75 }}
      exit={{ d: getDiagonal(source, source), opacity: 0 }}
      className="link"
    ></motion.path>
  );
};

Link.propTypes = {
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  sourcePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default Link;
