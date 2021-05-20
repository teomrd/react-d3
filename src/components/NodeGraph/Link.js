import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3-shape";
import { motion } from "framer-motion";

const diagonal = d3
  .linkVertical()
  .x((d) => d.x)
  .y((d) => d.y);

const Link = ({ source, target, sourcePosition, duration }) => {
  const { x: sx = source.x, y: sy = source.y } = sourcePosition || {};
  const o = { x: sx, y: sy };
  return (
    <motion.path
      initial={{ d: diagonal({ source: o, target: o }), opacity: 0 }}
      animate={{ d: diagonal({ source, target }), opacity: 1 }}
      exit={{ d: diagonal({ source: o, target: o }), opacity: 0 }}
      transition={{ duration }}
      className="link"
    ></motion.path>
  );
};

Link.propTypes = {
  source: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  target: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  sourcePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  duration: PropTypes.number,
};

Link.defaultProps = {
  source: {
    x: 0,
    y: 0,
  },
  target: {
    x: 0,
    y: 0,
  },
  duration: 0.75,
};

export default Link;
